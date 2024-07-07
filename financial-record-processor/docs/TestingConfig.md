# Testing Guide

This guide covers both unit testing and integration testing for the Financial Record Processor.

## Test Configuration

This project uses Jest for both unit and integration testing. There are two Jest configuration files:

1. `jest.config.js`: Configuration for unit tests.
2. `jest.integration.config.js`: Configuration for integration tests.

## Unit Testing

Unit tests are located in the `tests` directory with the naming convention `*.test.js/ts`.

### Running Unit Tests

Run the unit test suite: npm run test

This command uses the configuration in `jest.config.js`.

## Integration Testing

Integration tests are also located in the `tests` directory, specifically in `integration.js/ts`.

### Running Integration Tests

Run the integration test suite:  npm run test:integration

This command uses the configuration in `jest.integration.config.js`.

## Writing Tests

[Previous content on writing tests remains the same]

## Continuous Integration

[Previous content on CI setup remains the same]

## Environment Variables in Testing

The project uses a `.env` file for environment variables. For testing, you may want to create a separate `.env.test` file with test-specific values.

To use different environment variables for testing, you can modify your Jest configurations to set up the environment before running tests.

Example addition to Jest config files:

```javascript
module.exports = {
  // ... other configurations
  setupFiles: ['<rootDir>/tests/setEnvVars.js']
};
