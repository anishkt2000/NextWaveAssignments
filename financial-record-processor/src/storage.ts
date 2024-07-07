import AWS from 'aws-sdk';
import { ProcessedTransaction } from './types/types';

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.STORAGE_BUCKET || '';

export async function saveTransaction(transaction: ProcessedTransaction): Promise<void> {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `transactions/${transaction.transactionId}.json`,
    Body: JSON.stringify(transaction),
    ContentType: 'application/json',
  };

  await s3.putObject(params).promise();
}

export async function getTransaction(transactionId: string): Promise<ProcessedTransaction | null> {
  const params = {
    Bucket: BUCKET_NAME,
    Key: `transactions/${transactionId}.json`,
  };

  try {
    const data = await s3.getObject(params).promise();
    return JSON.parse(data.Body?.toString() || '');
  } catch (error) {
    if ((error as AWS.AWSError).code === 'NoSuchKey') {
      return null;
    }
    throw error;
  }
}