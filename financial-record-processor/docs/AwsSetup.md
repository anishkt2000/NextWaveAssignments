# AWS Setup Guide

This guide will walk you through setting up the Financial Record Processor on AWS.

## Prerequisites

1. An AWS account
2. AWS CLI installed and configured with your credentials
3. Node.js and npm installed

## Steps

1. **Create an IAM Role for Lambda**
   - Go to IAM in AWS Console
   - Create a new role for Lambda
   - Attach policies:
     - AWSLambdaBasicExecutionRole
     - AWSLambdaVPCAccessExecutionRole (if using VPC)

2. **Create a Lambda Function**
   - Go to Lambda in AWS Console
   - Create a new function
   - Choose "Author from scratch"
   - Set runtime to Node.js 14.x
   - Choose the IAM role created in step 1

3. **Set up API Gateway**
   - Go to API Gateway in AWS Console
   - Create a new REST API
   - Create resources and methods:
     - POST /process
     - GET /transaction/{transactionId}
   - Set up Lambda proxy integration for each method

4. **Deploy the API**
   - Create a new stage (e.g., "prod")
   - Deploy the API to this stage

5. **Update Environment Variables**
   - In your Lambda function configuration, add:
     - ANONYMIZATION_KEY
     - ENCRYPTION_KEY

6. **Deploy the Code**
   - Update the Lambda function name in package.json
   - Run `npm run deploy` from your local machine

7. **Test the Deployment**
   - Use the API Gateway URL to send test requests

## Troubleshooting

- Check CloudWatch Logs for any Lambda execution errors
- Ensure IAM roles have necessary permissions
- Verify API Gateway settings and deployments

For any issues, consult AWS documentation or seek support from AWS forums.