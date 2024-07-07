import { processTransaction } from '../src/index';
import { getTransaction } from '../src/storage';
import { Transaction } from '../src/types/types';

const sampleTransaction: Transaction = {
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
describe('Integration Tests', () => {
  it('should process and retrieve a transaction', async () => {
    const processed = await processTransaction(sampleTransaction);
    expect(processed).toBeDefined();
    expect(processed.riskScore).toBeDefined();
    expect(processed.encryptedData).toBeDefined();

    const retrieved = await getTransaction(processed.transactionId);
    expect(retrieved).toBeDefined();
    expect(retrieved?.transactionId).toBe(processed.transactionId);
    expect(retrieved?.riskScore).toBe(processed.riskScore);
  });

  it('should return null for non-existent transaction', async () => {
    const retrieved = await getTransaction('non-existent-id');
    expect(retrieved).toBeNull();
  });
});