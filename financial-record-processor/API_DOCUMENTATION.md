# Financial Record Processor API Documentation

## Endpoints

### Process Transaction
- **URL**: `/transaction`
- **Method**: `POST`
- **Request Body**: Transaction object (see sample below)
- **Response**: Processed transaction object

### Get Transaction
- **URL**: `/transaction/{id}`
- **Method**: `GET`
- **URL Params**: `id=[string]`
- **Response**: Processed transaction object

## Sample Transaction Object

```json
{
  "transactionId": "TXN123456789",
  "userId": "USER98765",
  "transactionDetails": {
    "amount": 250.00,
    "currency": "USD",
    "transactionDate": "2024-04-18T12:34:56Z",
    "paymentMethod": "CreditCard",
    "merchantDetails": {
      "merchantId": "MERCHANT12345",
      "name": "Example Merchant",
      "category": "Electronics",
      "countryCode": "US"
    }
  },
  "userDetails": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+11234567890",
    "billingAddress": {
      "street": "123 Elm St",
      "city": "Anytown",
      "state": "CA",
      "postalCode": "90210",
      "country": "USA"
    }
  },
  "additionalInfo": {
    "deviceIp": "192.168.1.1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  }
}