"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTransaction = saveTransaction;
exports.loadTransactions = loadTransactions;
exports.getTransaction = getTransaction;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3();
const BUCKET_NAME = process.env.STORAGE_BUCKET || '';
const STORAGE_FILE = path_1.default.join(__dirname, '../data/transactions.json');
function saveTransaction(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transactions = yield loadTransactions();
            transactions.push(transaction);
            yield promises_1.default.writeFile(STORAGE_FILE, JSON.stringify(transactions, null, 2));
        }
        catch (error) {
            console.error('Error saving transaction:', error);
            throw error;
        }
    });
}
function loadTransactions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield promises_1.default.readFile(STORAGE_FILE, 'utf-8');
            return data ? JSON.parse(data) : [];
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            console.error('Error loading transactions:', error);
            return []; // Return an empty array instead of throwing
        }
    });
}
function getTransaction(transactionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const transactions = yield loadTransactions();
        return transactions.find(t => t.transactionId === transactionId) || null;
    });
}
