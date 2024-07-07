import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'financial-record-processor' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export default logger;