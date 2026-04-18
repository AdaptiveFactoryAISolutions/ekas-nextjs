# Production Setup Notes: Demo Request Form

This document outlines the AWS configuration required before deploying the demo request form to production.

---

## Prerequisites

The demo request form API (`/api/demo-request`) requires the following AWS services to be configured:

1. **Amazon SES** (Simple Email Service) - for sending email notifications
2. **Amazon S3** - for storing demo request submissions
3. **AWS IAM** - for granting permissions to the Amplify service role
4. **AWS KMS** (optional but recommended) - for S3 encryption

---

## 1. Verify SES Email Identities

Amazon SES requires you to verify email addresses before you can send from them.

### Via AWS CLI:

```bash
# Verify the "from" address
aws ses verify-email-identity --email-address noreply@adaptivefactory.net --region us-east-1

# Verify the "to" address (only required if SES is in sandbox mode)
aws ses verify-email-identity --email-address pat@adaptivefactory.net --region us-east-1
```

### Via AWS Console:

1. Open [AWS SES Console](https://console.aws.amazon.com/ses/home?region=us-east-1)
2. Navigate to **Verified identities**
3. Click **Create identity**
4. Select **Email address**
5. Enter `noreply@adaptivefactory.net`
6. Click **Create identity**
7. Check the inbox for `noreply@adaptivefactory.net` and click the verification link
8. Repeat steps 3-7 for `pat@adaptivefactory.net` if your account is in sandbox mode

---

## 2. Request SES Production Access

**If your AWS account is in SES sandbox mode**, you can only send emails to verified addresses. To send to any email address (production mode), you must request production access.

### Check if you're in sandbox mode:

```bash
aws sesv2 get-account --region us-east-1 | grep ProductionAccessEnabled
```

If `ProductionAccessEnabled` is `false`, you're in sandbox mode.

### Request production access:

1. Open [AWS SES Console](https://console.aws.amazon.com/ses/home?region=us-east-1)
2. Navigate to **Account dashboard** in the left sidebar
3. Under **Sending statistics**, click **Request production access**
4. Fill out the form:
   - **Mail type**: Transactional
   - **Website URL**: https://main.d3h2hbq3io3jju.amplifyapp.com
   - **Use case description**: "Transactional email notifications for demo request form submissions on EKAS B2B website. Low volume (estimated <10 emails per day). Each email is a single notification to pat@adaptivefactory.net when a prospect requests a demo."
   - **How do you handle bounces/complaints**: "All emails are internal notifications to a single verified address (pat@adaptivefactory.net). We will monitor AWS SES bounce/complaint metrics and immediately address any issues."
   - **Acknowledgement**: Check all boxes
5. Click **Submit request**

**Expected approval time**: Usually 24 hours, sometimes faster.

**Deploy blocker?**: No. The form will work in sandbox mode for testing (emails will only go to verified addresses). You can deploy now and the form will start working for all users once production access is approved.

---

## 3. Create S3 Bucket for Lead Storage

Create an S3 bucket to store demo request submissions with KMS encryption.

### Via AWS CLI:

```bash
# Create bucket
aws s3 mb s3://adaptivefactory-leads --region us-east-1

# Enable default encryption with existing KMS key
aws s3api put-bucket-encryption \
  --bucket adaptivefactory-leads \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "aws:kms",
        "KMSMasterKeyID": "alias/ekas-s3"
      },
      "BucketKeyEnabled": true
    }]
  }'

# Block all public access
aws s3api put-public-access-block \
  --bucket adaptivefactory-leads \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# Enable versioning (optional but recommended)
aws s3api put-bucket-versioning \
  --bucket adaptivefactory-leads \
  --versioning-configuration Status=Enabled
```

### Via AWS Console:

1. Open [S3 Console](https://s3.console.aws.amazon.com/s3/home?region=us-east-1)
2. Click **Create bucket**
3. **Bucket name**: `adaptivefactory-leads`
4. **Region**: US East (N. Virginia) us-east-1
5. **Block Public Access settings**: Leave all boxes checked (block all public access)
6. **Bucket Versioning**: Enable (recommended)
7. **Default encryption**:
   - Encryption type: **Server-side encryption with AWS KMS keys (SSE-KMS)**
   - AWS KMS key: Select **Choose from your AWS KMS keys**
   - Find and select `alias/ekas-s3` (or create a new key if it doesn't exist)
   - Bucket Key: **Enable**
8. Click **Create bucket**

**If `alias/ekas-s3` doesn't exist**, you can:
- Create a new KMS key in the [KMS Console](https://console.aws.amazon.com/kms/home?region=us-east-1#/kms/keys), OR
- Use `alias/aws/s3` (AWS managed key - free but less control), OR
- Update `.env.example` and the API route to remove KMS references (bucket will use SSE-S3 encryption instead)

---

## 4. Grant IAM Permissions to Amplify Service Role

The AWS Amplify service role needs permission to send emails via SES and write objects to the S3 bucket.

### Find your Amplify service role name:

1. Open [Amplify Console](https://console.aws.amazon.com/amplify/home?region=us-east-1)
2. Select your app
3. Go to **App settings** > **General**
4. Note the **Service role** name (e.g., `amplifyconsole-backend-role`)

### Create IAM policy document:

Save this as `demo-request-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowSESSendEmail",
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "ses:FromAddress": "noreply@adaptivefactory.net"
        }
      }
    },
    {
      "Sid": "AllowS3PutDemoRequests",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::adaptivefactory-leads/demo-requests/*"
    },
    {
      "Sid": "AllowKMSEncryption",
      "Effect": "Allow",
      "Action": [
        "kms:Decrypt",
        "kms:GenerateDataKey"
      ],
      "Resource": "arn:aws:kms:us-east-1:*:key/*",
      "Condition": {
        "StringEquals": {
          "kms:ViaService": "s3.us-east-1.amazonaws.com"
        }
      }
    }
  ]
}
```

### Attach policy to Amplify role via AWS CLI:

```bash
# Create the policy
aws iam create-policy \
  --policy-name DemoRequestFormPolicy \
  --policy-document file://demo-request-policy.json

# Attach to Amplify service role (replace YOUR_SERVICE_ROLE_NAME)
aws iam attach-role-policy \
  --role-name YOUR_SERVICE_ROLE_NAME \
  --policy-arn arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):policy/DemoRequestFormPolicy
```

### Attach policy via AWS Console:

1. Open [IAM Console](https://console.aws.amazon.com/iam/home?region=us-east-1#/roles)
2. Search for your Amplify service role (e.g., `amplifyconsole-backend-role`)
3. Click the role name
4. Click **Add permissions** > **Create inline policy**
5. Click **JSON** tab
6. Paste the policy document above
7. Click **Review policy**
8. Name: `DemoRequestFormPolicy`
9. Click **Create policy**

---

## 5. Set Environment Variables in Amplify Console

The API route reads configuration from environment variables. You must set these in the Amplify Console.

### Steps:

1. Open [Amplify Console](https://console.aws.amazon.com/amplify/home?region=us-east-1)
2. Select your app
3. Go to **App settings** > **Environment variables**
4. Click **Manage variables**
5. Add the following variables:

| Variable | Value |
|----------|-------|
| `AWS_REGION` | `us-east-1` |
| `SES_FROM_EMAIL` | `noreply@adaptivefactory.net` |
| `DEMO_REQUEST_TO_EMAIL` | `pat@adaptivefactory.net` |
| `DEMO_REQUEST_S3_BUCKET` | `adaptivefactory-leads` |
| `DEMO_REQUEST_S3_KMS_KEY_ID` | `alias/ekas-s3` |

6. Click **Save**

**Note**: If you're not using KMS encryption or are using the AWS managed key, you can omit `DEMO_REQUEST_S3_KMS_KEY_ID` or set it to an empty string.

---

## 6. Configure DNS Records for Email Deliverability (Recommended)

To prevent demo request emails from going to spam, configure SPF and DKIM records for `adaptivefactory.net`.

**This is NOT a deploy blocker** - the form will work without it. But emails may land in spam without proper DNS configuration.

### Steps:

1. Open [SES Console](https://console.aws.amazon.com/ses/home?region=us-east-1)
2. Navigate to **Verified identities**
3. Click on `noreply@adaptivefactory.net` (or verify the domain `adaptivefactory.net` instead for easier management)
4. Go to **DomainKeys Identified Mail (DKIM)** tab
5. Click **Publish DNS records**
6. Copy the three CNAME records
7. Add them to your DNS provider (wherever `adaptivefactory.net` is hosted)
8. Wait for DNS propagation (usually 5-30 minutes)
9. Refresh the SES console - status should change to **Verified**

### SPF Record (if not already configured):

Add this TXT record to `adaptivefactory.net`:

```
v=spf1 include:amazonses.com ~all
```

**Timeline**: This is a 30-minute task, not a deploy blocker. You should do this within 24 hours of deploying the form to production.

---

## 7. Pre-Deploy Checklist

Before deploying to production, verify:

- [ ] SES email identities verified (`noreply@adaptivefactory.net` and `pat@adaptivefactory.net`)
- [ ] SES production access requested (if not already approved)
- [ ] S3 bucket created (`adaptivefactory-leads`)
- [ ] S3 bucket encryption enabled (KMS or SSE-S3)
- [ ] IAM policy attached to Amplify service role
- [ ] Environment variables set in Amplify Console
- [ ] DNS records configured for DKIM/SPF (can be done within 24 hours of deploy)

---

## 8. Post-Deploy Testing

After deploying to production, test the form end-to-end:

### Test 1: Valid submission

1. Open the live site
2. Click "Request a Demo"
3. Fill in the form with:
   - First Name: Test
   - Last Name: User
   - Email: `pat@adaptivefactory.net` (or your verified email if in sandbox)
   - Company: Test Manufacturing Co.
   - Job Title: Plant Manager
4. Submit the form
5. Verify:
   - Form shows "Request received." success message
   - Email arrives at `pat@adaptivefactory.net` within 60 seconds
   - Reply-To is set to the submitted email
   - S3 object exists at `s3://adaptivefactory-leads/demo-requests/YYYY/MM/DD/*.json`

### Test 2: Business email validation

1. Try submitting with email `test@gmail.com`
2. Verify error message: "Business email required. Personal email addresses (gmail.com, yahoo.com, etc.) are not accepted."

### Test 3: Rate limiting

1. Submit 4 times quickly from the same IP
2. Verify 4th submission shows: "Rate limit exceeded. Maximum 3 demo requests per hour from your IP address."

### Test 4: Mobile browser

1. Open the site on a phone
2. Submit a demo request
3. Verify form works correctly (this is where most prospects will be)

---

## 9. Monitoring and Maintenance

### Email delivery monitoring:

- Check [SES Console > Reputation metrics](https://console.aws.amazon.com/ses/home?region=us-east-1#/reputation) weekly
- Set up CloudWatch alarms for bounce rate >5% or complaint rate >0.1%

### S3 storage:

- Demo requests are stored indefinitely by default
- Bucket path: `s3://adaptivefactory-leads/demo-requests/YYYY/MM/DD/<submission-id>.json`
- Consider setting up a lifecycle policy to archive requests >1 year old to Glacier

### Rate limiting:

- Current implementation uses in-memory storage (resets on each Amplify deploy)
- For production scale, consider migrating to Redis or DynamoDB if rate limiting abuse becomes an issue

---

## 10. Troubleshooting

### Form submits but no email received:

1. Check CloudWatch Logs for the API route: **Amplify Console** > **Monitoring** > **Logging**
2. Search for errors containing "Failed to process demo request"
3. Check SES sending quota: `aws sesv2 get-account --region us-east-1 | grep SendQuota`
4. Verify email in SES Console is still verified
5. Check spam folder

### S3 write failure:

1. Verify IAM permissions are attached to the Amplify service role
2. Check bucket name matches environment variable exactly
3. Verify KMS key exists and Amplify role has `kms:GenerateDataKey` permission

### Form not loading:

1. Check browser console for JavaScript errors
2. Verify dev server restarted after AWS SDK packages were installed
3. Clear browser cache

---

## Questions?

If you encounter issues during setup, check:
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS Amplify Environment Variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)

Or contact pat@adaptivefactory.net for assistance.
