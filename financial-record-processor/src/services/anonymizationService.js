"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.anonymizeTransaction = anonymizeTransaction;
const crypto_1 = __importDefault(require("crypto"));
const ANONYMIZATION_KEY = 'your-secret-key-here';
function anonymizeTransaction(transaction) {
    const { userDetails } = transaction, rest = __rest(transaction, ["userDetails"]);
    const pseudonym = generatePseudonym(transaction.userId);
    const hashedEmail = hashData(userDetails.email);
    const hashedPhone = hashData(userDetails.phone);
    return Object.assign(Object.assign({}, rest), { userDetails: {
            pseudonym,
            hashedEmail,
            hashedPhone,
            billingAddress: {
                country: userDetails.billingAddress.country,
            },
        } });
}
function generatePseudonym(userId) {
    const hmac = crypto_1.default.createHmac('sha256', ANONYMIZATION_KEY);
    hmac.update(userId);
    return hmac.digest('hex').substring(0, 16);
}
function hashData(data) {
    return crypto_1.default.createHash('sha256').update(data).digest('hex');
}
