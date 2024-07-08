# Risk Assessment Logic

The risk assessment algorithm evaluates each transaction based on multiple weighted factors to produce a risk score between 0 and 100.

## Risk Factors

1. **Transaction Amount** (40% weight)
   - > $10,000: High risk (score 1.0)
   - $5,000 - $10,000: Medium-high risk (score 0.7)
   - $1,000 - $5,000: Medium risk (score 0.4)
   - < $1,000: Low risk (score 0.1)

2. **Merchant Location** (30% weight)
   - High-risk countries (e.g., those with weak financial regulations): High risk (score 1.0)
   - All other countries: Low risk (score 0.0)

3. **Payment Method** (30% weight)
   - High-risk methods (e.g., cryptocurrency, gift cards): High risk (score 1.0)
   - Standard methods (e.g., credit card, bank transfer): Low risk (score 0.2)

## Calculation

1. Each factor is evaluated and assigned a risk score between 0 and 1.
2. The score for each factor is multiplied by its weight.
3. The weighted scores are summed.
4. The total is multiplied by 100 and rounded to the nearest integer to get a score between 0 and 100.

## Example

For a transaction with:
- Amount: $6,000
- Merchant Location: Non-high-risk country
- Payment Method: Credit Card

Calculation:
1. Amount: 0.7 * 0.4 = 0.28
2. Location: 0.0 * 0.3 = 0.0
3. Payment Method: 0.2 * 0.3 = 0.06

Total: (0.28 + 0.0 + 0.06) * 100 = 34

Final Risk Score: 34 out of 100

## Interpretation

- 0-20: Low Risk
- 21-50: Medium Risk
- 51-80: High Risk
- 81-100: Very High Risk

The system also returns the specific risk factors that contributed to the score, allowing for more detailed analysis and decision-making.