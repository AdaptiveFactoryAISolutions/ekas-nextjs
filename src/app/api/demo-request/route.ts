import { NextRequest, NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Environment configuration
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const SES_FROM_EMAIL = process.env.SES_FROM_EMAIL || "noreply@adaptivefactory.net";
const DEMO_REQUEST_TO_EMAIL = process.env.DEMO_REQUEST_TO_EMAIL || "pat@adaptivefactory.net";
const DEMO_REQUEST_S3_BUCKET = process.env.DEMO_REQUEST_S3_BUCKET || "adaptivefactory-leads";
const DEMO_REQUEST_S3_KMS_KEY_ID = process.env.DEMO_REQUEST_S3_KMS_KEY_ID;

// AWS clients
const awsCredentials =
  process.env.EKAS_SES_ACCESS_KEY_ID && process.env.EKAS_SES_SECRET_ACCESS_KEY
    ? {
        accessKeyId: process.env.EKAS_SES_ACCESS_KEY_ID,
        secretAccessKey: process.env.EKAS_SES_SECRET_ACCESS_KEY,
      }
    : undefined;

const sesClient = new SESClient({
  region: AWS_REGION,
  ...(awsCredentials ? { credentials: awsCredentials } : {}),
});
const s3Client = new S3Client({
  region: AWS_REGION,
  ...(awsCredentials ? { credentials: awsCredentials } : {}),
});

// Rate limiting: simple in-memory store (for production, use Redis or DynamoDB)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Blocked consumer email domains
const CONSUMER_EMAIL_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com",
  "icloud.com", "live.com", "msn.com", "protonmail.com", "mail.com",
  "yandex.com", "zoho.com", "gmx.com", "inbox.com", "me.com"
];

interface DemoRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone?: string;
  message?: string;
}

function validateEmail(email: string): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Valid email address required." };
  }

  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) {
    return { valid: false, error: "Valid email address required." };
  }

  if (CONSUMER_EMAIL_DOMAINS.includes(domain)) {
    return {
      valid: false,
      error: "Business email required. Personal email addresses (gmail.com, yahoo.com, etc.) are not accepted."
    };
  }

  return { valid: true };
}

function checkRateLimit(ip: string): { allowed: boolean; error?: string } {
  const now = Date.now();
  const key = ip;
  const limit = rateLimitStore.get(key);

  if (!limit || now > limit.resetAt) {
    // First request or window expired
    rateLimitStore.set(key, { count: 1, resetAt: now + 3600000 }); // 1 hour
    return { allowed: true };
  }

  if (limit.count >= 3) {
    return {
      allowed: false,
      error: "Rate limit exceeded. Maximum 3 demo requests per hour from your IP address."
    };
  }

  limit.count += 1;
  rateLimitStore.set(key, limit);
  return { allowed: true };
}

function getClientIp(request: NextRequest): string {
  // Try various headers in order of reliability
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  // Fallback
  return "unknown";
}

async function sendEmailNotification(data: DemoRequestBody, submissionId: string): Promise<void> {
  const emailBody = `
New Demo Request Received
========================

Submission ID: ${submissionId}
Timestamp: ${new Date().toISOString()}

Contact Information
-------------------
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Company: ${data.company}
Job Title: ${data.jobTitle}
${data.phone ? `Phone: ${data.phone}` : ""}

${data.message ? `Message:\n${data.message}` : ""}

---
This notification was sent from the EKAS demo request form.
Reply directly to this email to respond to ${data.firstName}.
`;

  const emailParams = {
    Source: SES_FROM_EMAIL,
    Destination: {
      ToAddresses: [DEMO_REQUEST_TO_EMAIL],
    },
    Message: {
      Subject: {
        Data: `Demo Request: ${data.company} - ${data.firstName} ${data.lastName}`,
      },
      Body: {
        Text: {
          Data: emailBody,
        },
      },
    },
    ReplyToAddresses: [data.email],
  };

  const command = new SendEmailCommand(emailParams);
  await sesClient.send(command);
}

async function writeToS3(data: DemoRequestBody, submissionId: string, ip: string): Promise<void> {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");

  const s3Key = `demo-requests/${year}/${month}/${day}/${submissionId}.json`;

  const payload = {
    submissionId,
    timestamp: now.toISOString(),
    ip,
    data,
  };

  const putParams: any = {
    Bucket: DEMO_REQUEST_S3_BUCKET,
    Key: s3Key,
    Body: JSON.stringify(payload, null, 2),
    ContentType: "application/json",
    ServerSideEncryption: "aws:kms",
  };

  if (DEMO_REQUEST_S3_KMS_KEY_ID) {
    putParams.SSEKMSKeyId = DEMO_REQUEST_S3_KMS_KEY_ID;
  }

  const command = new PutObjectCommand(putParams);
  await s3Client.send(command);
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request);

    // Check rate limit
    const rateLimitCheck = checkRateLimit(clientIp);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { ok: false, error: rateLimitCheck.error },
        { status: 400 }
      );
    }

    // Parse and validate request body
    let body: DemoRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.firstName || typeof body.firstName !== "string" || body.firstName.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "First name is required." },
        { status: 400 }
      );
    }

    if (!body.lastName || typeof body.lastName !== "string" || body.lastName.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "Last name is required." },
        { status: 400 }
      );
    }

    if (!body.email || typeof body.email !== "string" || body.email.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!body.company || typeof body.company !== "string" || body.company.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "Company name is required." },
        { status: 400 }
      );
    }

    if (!body.jobTitle || typeof body.jobTitle !== "string" || body.jobTitle.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "Job title is required." },
        { status: 400 }
      );
    }

    // Validate email format and domain
    const emailValidation = validateEmail(body.email.trim());
    if (!emailValidation.valid) {
      return NextResponse.json(
        { ok: false, error: emailValidation.error },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData: DemoRequestBody = {
      firstName: body.firstName.trim().slice(0, 100),
      lastName: body.lastName.trim().slice(0, 100),
      email: body.email.trim().toLowerCase().slice(0, 255),
      company: body.company.trim().slice(0, 200),
      jobTitle: body.jobTitle.trim().slice(0, 100),
      phone: body.phone?.trim().slice(0, 20),
      message: body.message?.trim().slice(0, 2000),
    };

    // Generate submission ID
    const submissionId = `demo-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

    // Send email notification and write to S3
    try {
      await Promise.all([
        sendEmailNotification(sanitizedData, submissionId),
        writeToS3(sanitizedData, submissionId, clientIp),
      ]);
    } catch (error) {
      console.error("Failed to process demo request:", error);
      return NextResponse.json(
        {
          ok: false,
          error: "Submission failed. Please email pat@adaptivefactory.net directly."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (error) {
    console.error("Unexpected error in demo request handler:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Submission failed. Please email pat@adaptivefactory.net directly."
      },
      { status: 500 }
    );
  }
}
