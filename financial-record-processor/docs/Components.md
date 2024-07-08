# System Components

## 1. Validation (validation.ts)

This component ensures that incoming transaction data is complete and properly formatted.

### Key Functions:
- `validateTransaction(transaction: Transaction): boolean`

### Logic:
- Checks for the presence of all required fields
- Validates data types of each field
- Ensures nested objects (like merchantDetails) are present and valid

## 2. Anonymization (anonymization.ts)

This component removes or hashes personally identifiable information from the transaction data.

### Key Functions:
- `anonymizeTransaction(transaction: Transaction): AnonymizedTransaction`

### Logic:
- Hashes the userId using SHA-256 and a secret key
- Removes sensitive fields like name, email, and full address
- Retains necessary non-sensitive information

## 3. Risk Assessment (riskAssessment.ts)

This component evaluates the risk level of each transaction based on various factors.

### Key Functions:
- `assessRisk(transaction: AnonymizedTransaction): RiskAssessment`

### Logic:
- Evaluates transaction amount, merchant location, and payment method
- Calculates a weighted risk score
- Identifies specific risk factors

For detailed risk assessment logic, see RiskAssessment.md.

## 4. Encryption (encryption.ts)

This component secures the processed transaction data before storage.

### Key Functions:
- `encryptData(data: AnonymizedTransaction): string`
- `decryptData(encryptedData: string): AnonymizedTransaction`

### Logic:
- Uses AES-256-CBC encryption
- Generates a random IV for each encryption
- Combines IV and encrypted data for storage

## 5. Storage (storage.ts)

This component handles the storage and retrieval of encrypted transaction data.

### Key Functions:
- `saveToStorage(encryptedData: string): Promise<void>`
- `retrieveFromStorage(transactionId: string): Promise<string | null>`

### Logic:
- Currently implements file-based storage for local testing
- Can be extended to use AWS S3 or another cloud storage solution

## 6. Main Handler (index.ts)

This component orchestrates the overall process flow and handles API requests.


### Logic:
- Parses incoming API requests
- Coordinates the flow between other components
- Handles error cases and generates appropriate responses