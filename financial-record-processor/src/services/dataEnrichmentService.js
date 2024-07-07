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
exports.enrichData = enrichData;
function enrichData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const enriched = Object.assign({}, data);
        if (data.transactionDetails.currency !== 'USD') {
            enriched.transactionDetails.convertedAmount = yield convertCurrency(data.transactionDetails.amount, data.transactionDetails.currency, 'USD');
        }
        enriched.economicIndicators = yield getEconomicIndicators(data.transactionDetails.merchantDetails.countryCode);
        return enriched;
    });
}
function convertCurrency(amount, from, to) {
    return __awaiter(this, void 0, void 0, function* () {
        // In a real application, this would call an external API
        const conversionRate = 1.1; // Example rate
        return Number((amount * conversionRate).toFixed(2));
    });
}
function getEconomicIndicators(countryCode) {
    return __awaiter(this, void 0, void 0, function* () {
        // In a real application, this would call an external API
        return {
            gdpGrowth: 2.5,
            inflationRate: 1.8,
            unemploymentRate: 3.6
        };
    });
}
