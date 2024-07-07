import { Transaction, ProcessedTransaction } from './types/types';
import { validateTransaction } from './utils/validation';
import { anonymizeTransaction } from './services/anonymizationService';
import { encryptData } from './services/encryptionService';
import { assessRisk } from './services/riskAssessmentService';
import { saveTransaction } from './services/storageService';
import logger from './utils/logger';
export async function processTransaction(rawData: any): Promise<ProcessedTransaction> {
  if (!validateTransaction(rawData)) {
    throw new Error('Invalid transaction data');
  }

  const transaction: Transaction = rawData;
  logger.info('Processing transaction', { transactionId: transaction.transactionId });

  const anonymized = anonymizeTransaction(transaction);
  const riskScore = assessRisk(anonymized);
  const encryptedData = encryptData(anonymized);

  const processedTransaction: ProcessedTransaction = {
    ...anonymized,
    riskScore,
    encryptedData,
  };

  await saveTransaction(processedTransaction);
  logger.info('Transaction processed successfully', { transactionId: transaction.transactionId });
  return processedTransaction;
}