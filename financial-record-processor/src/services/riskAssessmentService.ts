import { AnonymizedTransaction } from '../types/types';

export function assessRisk(transaction: AnonymizedTransaction): number {
  let riskScore = 0;

  // Factor 1: Transaction Amount
  const amount = transaction.transactionDetails.amount;
  if (amount > 10000) {
    riskScore += 1.0 * 0.4; // High risk
  } else if (amount >= 5000 && amount <= 10000) {
    riskScore += 0.7 * 0.4; // Medium-high risk
  } else if (amount >= 1000 && amount < 5000) {
    riskScore += 0.4 * 0.4; // Medium risk
  } else if (amount < 1000) {
    riskScore += 0.1 * 0.4; // Low risk
  }

  // Factor 2: Merchant Location
  const country = transaction.transactionDetails.merchantDetails.countryCode;
  const highRiskCountries = ['AF', 'IQ', 'SY']; // Example high-risk countries
  if (highRiskCountries.includes(country)) {
    riskScore += 1.0 * 0.3; // High risk
  } else {
    riskScore += 0.0 * 0.3; // Low risk
  }

  // Factor 3: Payment Method
  const paymentMethod = transaction.transactionDetails.paymentMethod;
  const highRiskPaymentMethods = ['Cryptocurrency', 'GiftCard']; // Example high-risk payment methods
  if (highRiskPaymentMethods.includes(paymentMethod)) {
    riskScore += 1.0 * 0.3; // High risk
  } else {
    riskScore += 0.2 * 0.3; // Low risk
  }

  // Calculate the final risk score
  const finalRiskScore = Math.round(riskScore * 100);

  // Ensure the risk score is within the 0-100 range
  return Math.min(Math.max(finalRiskScore, 0), 100);
}
