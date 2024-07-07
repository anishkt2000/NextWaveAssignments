# Serverless Configuration Guide

This project uses the Serverless Framework to simplify deployment to AWS Lambda. The main configuration file is `serverless.yml`.

## Key Components of serverless.yml

1. **Service Name**: Defines the name of your serverless service.

2. **Provider**: Specifies AWS as the cloud provider and sets up general configuration:
   - Runtime (Node.js version)
   - Stage (e.g., dev, prod)
   - Region (AWS region for deployment)

3. **Functions**: Defines the Lambda functions:
   - `process`: Handles transaction processing
   - `retrieve`: Retrieves processed transactions

4. **Environment Variables**: Sets up environment variables for the Lambda functions.

5. **IAM Role Statements**: Defines the permissions for the Lambda functions.

6. **Plugins**: Lists any Serverless plugins used (e.g., for TypeScript support).

## Customizing the Configuration

1. **Changing the Region**: Update the `region` field under `provider`.

2. **Adding New Functions**: Add new entries under the `functions` section.

3. **Modifying Environment Variables**: Update the `environment` section.

4. **Adjusting Permissions**: Modify the `iamRoleStatements` to grant or restrict permissions.

## Deployment

To deploy your service:

1. Ensure AWS CLI is configured with your credentials.
2. Run: `serverless deploy`

For stage-specific deployment:

## Removing the Service

To remove all resources created by the Serverless Framework:

