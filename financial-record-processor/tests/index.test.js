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
const index_1 = require("../src/index");
const sampleTransaction = {
    transactionId: "TXN123456789",
    userId: "USER98765",
    transactionDetails: {
        amount: 250.00,
        currency: "USD",
        transactionDate: "2024-04-18T12:34:56Z",
        paymentMethod: "CreditCard",
        merchantDetails: {
            merchantId: "MERCHANT12345",
            name: "Example Merchant",
            category: "Electronics",
            countryCode: "US"
        }
    },
    userDetails: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+11234567890",
        billingAddress: {
            street: "123 Elm St",
            city: "Anytown",
            state: "CA",
            postalCode: "90210",
            country: "USA"
        }
    },
    additionalInfo: {
        deviceIp: "192.168.1.1",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }
};
describe('Transaction Processing', () => {
    it('should process a valid transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, index_1.processTransaction)(sampleTransaction);
        expect(result).toBeDefined();
        expect(result.riskScore).toBeDefined();
        expect(result.encryptedData).toBeDefined();
        expect(result.userDetails.pseudonym).toBeDefined();
        expect(result.userDetails.hashedEmail).toBeDefined();
        expect(result.userDetails.hashedPhone).toBeDefined();
    }));
});
