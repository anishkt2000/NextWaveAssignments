"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransaction = validateTransaction;
function validateTransaction(data) {
    if (typeof data !== 'object' || data === null) {
        return false;
    }
    // Basic structure validation
    if (typeof data.transactionId !== 'string' ||
        typeof data.userId !== 'string' ||
        typeof data.transactionDetails !== 'object' ||
        typeof data.userDetails !== 'object' ||
        typeof data.additionalInfo !== 'object') {
        return false;
    }
    // Detailed validation of nested objects
    const { transactionDetails, userDetails, additionalInfo } = data;
    if (typeof transactionDetails.amount !== 'number' ||
        typeof transactionDetails.currency !== 'string' ||
        typeof transactionDetails.transactionDate !== 'string' ||
        typeof transactionDetails.paymentMethod !== 'string' ||
        typeof transactionDetails.merchantDetails !== 'object') {
        return false;
    }
    if (typeof userDetails.firstName !== 'string' ||
        typeof userDetails.lastName !== 'string' ||
        typeof userDetails.email !== 'string' ||
        typeof userDetails.phone !== 'string' ||
        typeof userDetails.billingAddress !== 'object') {
        return false;
    }
    if (typeof additionalInfo.deviceIp !== 'string' ||
        typeof additionalInfo.userAgent !== 'string') {
        return false;
    }
    // Add more detailed checks as needed
    return true;
}
