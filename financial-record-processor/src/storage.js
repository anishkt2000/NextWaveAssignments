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
exports.getTransaction = getTransaction;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3();
const BUCKET_NAME = process.env.STORAGE_BUCKET || '';
function saveTransaction(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            Bucket: BUCKET_NAME,
            Key: `transactions/${transaction.transactionId}.json`,
            Body: JSON.stringify(transaction),
            ContentType: 'application/json',
        };
        yield s3.putObject(params).promise();
    });
}
function getTransaction(transactionId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const params = {
            Bucket: BUCKET_NAME,
            Key: `transactions/${transactionId}.json`,
        };
        try {
            const data = yield s3.getObject(params).promise();
            return JSON.parse(((_a = data.Body) === null || _a === void 0 ? void 0 : _a.toString()) || '');
        }
        catch (error) {
            if (error.code === 'NoSuchKey') {
                return null;
            }
            throw error;
        }
    });
}
