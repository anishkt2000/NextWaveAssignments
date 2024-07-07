export interface Transaction {
    transactionId: string;
    userId: string;
    transactionDetails: {
      amount: number;
      currency: string;
      transactionDate: string;
      paymentMethod: string;
      merchantDetails: {
        merchantId: string;
        name: string;
        category: string;
        countryCode: string;
      };
    };
    userDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      billingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
    };
    additionalInfo: {
      deviceIp: string;
      userAgent: string;
    };
  }
  
  export interface AnonymizedTransaction extends Omit<Transaction, 'userDetails'> {
    userDetails: {
      pseudonym: string;
      hashedEmail: string;
      hashedPhone: string;
      billingAddress: {
        country: string;
      };
    };
  }
  
  export interface ProcessedTransaction extends AnonymizedTransaction {
    riskScore: number;
    encryptedData: string;
  }