const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json, colorize, errors, splat } = format;
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");

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

function Logging(Logging_level, Entity, Events, message) {
  if (Models) {
    console.log("**************************************", Logging_level, Entity, Events, Models, message);
    logger.log({
      level: Logging_level,
      Entity: Entity,
      Events: Events,
      message: message,
      models: Models
    });
  } else {
    console.log("+++++++++++++++++++++++++++++++++++++", Logging_level, Entity, Events, message);
    logger.log({
      level: Logging_level,
      Entity: Entity,
      Events: Events,
      message: message
    });
  }
}

module.exports = Logging

