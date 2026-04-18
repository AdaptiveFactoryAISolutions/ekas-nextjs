# Demo Form Infrastructure — Locked Configuration

**DO NOT MODIFY without reading this entire doc first.**

Verified working: 2026-04-18. Commit tag: v1.0-demo-form-working. Commit SHA: c778ef1.

## Critical constraints (break any and the form dies silently)

1. IAM user ekas-demo-form-user must have DemoRequestFormPolicy attached.
   - Policy scopes ses:SendEmail to FromAddress=pat@adaptivefactory.net
   - Policy scopes s3:PutObject to adaptivefactory-leads/demo-requests/*
   - Policy scopes kms:* via s3.us-east-1.amazonaws.com only

2. Env var names MUST be EKAS_SES_* — Amplify silently filters any var containing the substring _AWS_ (including EKAS_AWS_*). Undocumented but reproducible.

3. Env vars MUST be written to .env.production during preBuild via printf.
   - Do NOT use heredoc (works but fragile with YAML indentation)
   - Next.js inlines values at "npm run build" time; Amplify SSR Lambda does NOT expose app-level env vars at runtime.

4. amplify.yml in the repo OVERRIDES console buildSpec. Do not edit the buildspec via "aws amplify update-app --build-spec". Edit amplify.yml in the repo and commit.

5. SES is in sandbox mode: only sends FROM/TO verified addresses. Both FROM and TO are currently pat@adaptivefactory.net. Request production access before auto-replying to prospects.

## If the form breaks, check in this order

### 1. Latest Amplify build succeeded?
    aws amplify list-jobs --app-id d3h2hbq3io3jju --branch-name main --region us-east-1 --max-items 3

### 2. CloudWatch log for the failing request
    aws logs tail /aws/amplify/d3h2hbq3io3jju --region us-east-1 --since 5m | tail -30

### 3. All 6 env vars in app config?
    aws amplify get-app --app-id d3h2hbq3io3jju --region us-east-1 --query 'app.environmentVariables' --output json | jq 'keys'

Expected 6: SES_FROM_EMAIL, DEMO_REQUEST_TO_EMAIL, DEMO_REQUEST_S3_BUCKET, DEMO_REQUEST_S3_KMS_KEY_ID, EKAS_SES_ACCESS_KEY_ID, EKAS_SES_SECRET_ACCESS_KEY.

### 4. .env.production written correctly during build?
    aws amplify get-job --app-id d3h2hbq3io3jju --branch-name main --job-id <ID> --region us-east-1 --query 'job.steps[0].logUrl' --output text | xargs -I {} curl -s {} | grep -E "Writing .env|Variable names|Line count"

Should show 6 variable names (values redacted).

## Key locations

| Resource | Location |
|---|---|
| Access keys CSV | ~/Documents/AWS Keys /ekas-demo-form-user_accessKeys.csv (mode 600) |
| Amplify app | d3h2hbq3io3jju (us-east-1) |
| Live URL | https://main.d3h2hbq3io3jju.amplifyapp.com |
| S3 bucket | adaptivefactory-leads/demo-requests/YYYY/MM/DD/*.json |
| SES identity | pat@adaptivefactory.net (verified) |
| IAM policy doc | demo-request-iam-policy.json (in repo) |
| Build log group | /aws/amplify/d3h2hbq3io3jju |
| Working commit tag | v1.0-demo-form-working (commit c778ef1) |
| Out-of-band buildspec backup | ~/Documents/AWS Keys /amplify.yml.WORKING-2026-04-18 |

## Things to NEVER do

- Rename EKAS_SES_* env vars to include AWS_ anywhere in the name
- Delete amplify.yml from the repo
- Edit buildspec via AWS Console (silently overridden by repo on next build)
- Commit .env* files (gitignored; keep it that way)
- Store access keys in the repo, in Claude Code prompts, or in terminal history
- Modify route.ts credential-loading pattern without reading this doc first
- Let Claude Code run aws iam, aws amplify update-*, or modify amplify.yml without reviewing the exact commands first

## Recovery

### If main gets corrupted
    cd ~/"EKAS B2B website/ekas-nextjs"
    git fetch --tags
    git checkout v1.0-demo-form-working -- .
    git commit -m "restore: recover from v1.0-demo-form-working"
    git push origin main

### If amplify.yml gets corrupted
    cp ~/"Documents/AWS Keys /amplify.yml.WORKING-2026-04-18" ~/"EKAS B2B website/ekas-nextjs/amplify.yml"
    cd ~/"EKAS B2B website/ekas-nextjs"
    git add amplify.yml
    git commit -m "restore: amplify.yml from out-of-band backup"
    git push origin main

### If IAM user access keys get rotated
1. Create new key for ekas-demo-form-user via AWS Console
2. Save to ~/Documents/AWS Keys / (mode 600)
3. Re-parse via sed into shell vars
4. Update Amplify env vars via aws amplify update-app
5. Trigger new build

## Monthly verification routine

Submit the form as pat@adaptivefactory.net. If you get the success modal AND an email in pclay7325@gmail.com within 60 sec, the pipeline is healthy. If not, work through the 4 diagnostic steps above.
