const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, colorize, errors, splat } = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}`;
  })
);

// Create a Winston logger
const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    errors({ stack: true }),
    splat(),
    json()
  ),
  transports: [
    new transports.Console({ format: consoleLogFormat }),
    new transports.File({ filename: 'application-error.log', level: 'error' }),
    new transports.File({ filename: 'app_runtime.log' })
  ]
});

module.exports = logger

