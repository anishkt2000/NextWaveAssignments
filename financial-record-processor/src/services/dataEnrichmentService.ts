import axios from 'axios';

export async function enrichData(data: any): Promise<any> {
  const enriched = { ...data };

  if (data.transactionDetails.currency !== 'USD') {
    enriched.transactionDetails.convertedAmount = await convertCurrency(
      data.transactionDetails.amount,
      data.transactionDetails.currency,
      'USD'
    );
  }

  enriched.economicIndicators = await getEconomicIndicators(data.transactionDetails.merchantDetails.countryCode);

  return enriched;
}

async function convertCurrency(amount: number, from: string, to: string): Promise<number> {
  // In a real application, this would call an external API
  const conversionRate = 1.1;  // Example rate
  return Number((amount * conversionRate).toFixed(2));
}

async function getEconomicIndicators(countryCode: string): Promise<any> {
  // In a real application, this would call an external API
  return {
    gdpGrowth: 2.5,
    inflationRate: 1.8,
    unemploymentRate: 3.6
  };
}