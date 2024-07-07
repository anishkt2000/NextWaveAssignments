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
exports.processTransaction = processTransaction;
const validation_1 = require("./utils/validation");
const anonymizationService_1 = require("./services/anonymizationService");
const encryptionService_1 = require("./services/encryptionService");
const riskAssessmentService_1 = require("./services/riskAssessmentService");
const storageService_1 = require("./services/storageService");
const logger_1 = __importDefault(require("./utils/logger"));
function processTransaction(rawData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, validation_1.validateTransaction)(rawData)) {
            throw new Error('Invalid transaction data');
        }
        const transaction = rawData;
        logger_1.default.info('Processing transaction', { transactionId: transaction.transactionId });
        const anonymized = (0, anonymizationService_1.anonymizeTransaction)(transaction);
        const riskScore = (0, riskAssessmentService_1.assessRisk)(anonymized);
        const encryptedData = (0, encryptionService_1.encryptData)(anonymized);
        const processedTransaction = Object.assign(Object.assign({}, anonymized), { riskScore,
            encryptedData });
        yield (0, storageService_1.saveTransaction)(processedTransaction);
        logger_1.default.info('Transaction processed successfully', { transactionId: transaction.transactionId });
        return processedTransaction;
    });
}
