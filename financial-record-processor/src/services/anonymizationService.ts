import crypto from 'crypto';
import { Transaction, AnonymizedTransaction } from '../types/types';

const ANONYMIZATION_KEY = 'your-secret-key-here';

export function anonymizeTransaction(transaction: Transaction): AnonymizedTransaction {
  const { userDetails, ...rest } = transaction;

  const pseudonym = generatePseudonym(transaction.userId);
  const hashedEmail = hashData(userDetails.email);
  const hashedPhone = hashData(userDetails.phone);

  return {
    ...rest,
    userDetails: {
      pseudonym,
      hashedEmail,
      hashedPhone,
      billingAddress: {
        country: userDetails.billingAddress.country,
      },
    },
  };
}

function generatePseudonym(userId: string): string {
  const hmac = crypto.createHmac('sha256', ANONYMIZATION_KEY);
  hmac.update(userId);
  return hmac.digest('hex').substring(0, 16);
}

function hashData(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}