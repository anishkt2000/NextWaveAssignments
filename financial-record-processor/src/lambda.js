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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionHandler = exports.processTransactionHandler = void 0;
const index_1 = require("./index");
const storageService_1 = require("./services/storageService");
const processTransactionHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rawData = JSON.parse(event.body || '{}');
        const result = yield (0, index_1.processTransaction)(rawData);
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    }
    catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
});
exports.processTransactionHandler = processTransactionHandler;
const getTransactionHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = event.pathParameters || {};
        if (!id) {
            throw new Error('Transaction ID is required');
        }
        const transaction = yield (0, storageService_1.getTransaction)(id);
        if (!transaction) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Transaction not found' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(transaction),
        };
    }
    catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
});
exports.getTransactionHandler = getTransactionHandler;
