import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const winstonConfig = {
  transports: [
    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'audit-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],

  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.json(),
  ),
};
