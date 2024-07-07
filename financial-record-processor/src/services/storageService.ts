import fs from 'fs/promises';
import path from 'path';
import AWS from 'aws-sdk';
import { ProcessedTransaction } from '../types/types';
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.STORAGE_BUCKET || '';
const STORAGE_FILE = path.join(__dirname, '../data/transactions.json');

export async function saveTransaction(transaction: ProcessedTransaction): Promise<void> {
  try {
    const transactions = await loadTransactions();
    transactions.push(transaction);
    await fs.writeFile(STORAGE_FILE, JSON.stringify(transactions, null, 2));
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw error;
  }
}

export async function loadTransactions(): Promise<ProcessedTransaction[]> {
  try {
    const data = await fs.readFile(STORAGE_FILE, 'utf-8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error('Error loading transactions:', error);
    return []; // Return an empty array instead of throwing
  }
}
export async function getTransaction(transactionId: string): Promise<ProcessedTransaction | null> {
  const transactions = await loadTransactions();
  return transactions.find(t => t.transactionId === transactionId) || null;
}