import { APIGatewayProxyHandler } from 'aws-lambda';
import { processTransaction } from './index';
import { saveTransaction, getTransaction } from './services/storageService';

export const processTransactionHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const rawData = JSON.parse(event.body || '{}');
    const result = await processTransaction(rawData);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: (error as Error).message }),
    };
  }
};

export const getTransactionHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const { id } = event.pathParameters || {};
    if (!id) {
      throw new Error('Transaction ID is required');
    }
    const transaction = await getTransaction(id);
    if (!transaction) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Transaction not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(transaction),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: (error as Error).message }),
    };
  }
};