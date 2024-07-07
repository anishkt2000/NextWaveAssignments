"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assessRisk = assessRisk;
function assessRisk(transaction) {
    let riskScore = 0;
    // Amount-based risk (logarithmic scale)
    riskScore += Math.log(transaction.transactionDetails.amount) * 10;
    // Currency risk
    const currencyRisk = {
        USD: 0,
        EUR: 5,
        GBP: 5,
        // Add more currencies and their risk scores
    };
    riskScore += currencyRisk[transaction.transactionDetails.currency] || 10;
    // Payment method risk
    const paymentMethodRisk = {
        CreditCard: 5,
        DebitCard: 3,
        BankTransfer: 1,
        // Add more payment methods and their risk scores
    };
    riskScore += paymentMethodRisk[transaction.transactionDetails.paymentMethod] || 7;
    // Merchant category risk
    const categoryRisk = {
        Electronics: 10,
        Groceries: 2,
        Travel: 15,
        // Add more categories and their risk scores
    };
    riskScore += categoryRisk[transaction.transactionDetails.merchantDetails.category] || 5;
    // Country risk
    const countryRisk = {
        US: 0,
        CA: 2,
        GB: 3,
        // Add more countries and their risk scores
    };
    riskScore += countryRisk[transaction.transactionDetails.merchantDetails.countryCode] || 10;
    // Time-based risk (higher risk for transactions outside business hours)
    const transactionHour = new Date(transaction.transactionDetails.transactionDate).getUTCHours();
    if (transactionHour < 9 || transactionHour > 18) {
        riskScore += 5;
    }
    // Normalize the risk score to be between 0 and 100
    return Math.min(Math.max(riskScore, 0), 100);
}
