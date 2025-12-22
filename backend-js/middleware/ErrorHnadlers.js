const BadRequestError = require('../customerror/BadRequest');
const ForbiddenError = require('../customerror/Forbidden');
const NotFoundError = require('../customerror/NotFound');
const UnauthorizedError = require('../customerror/Unauthorized');
const ValidationError = require('../customerror/Validation');
const Logging = require('../utils/Logger');
const { Logging_level, Entity, Events } = require('../utils/LoggerParams');

const ErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    let loggingLevel = Logging_level.error;
    let eventType = "ServerError";

    // Handle Custom Errors
    if (err instanceof BadRequestError) {
        statusCode = err.status;
        message = err.message;
        loggingLevel = Logging_level.warn;
        eventType = "BadRequest";
    } else if (err instanceof UnauthorizedError) {
        statusCode = err.status;
        message = err.message;
        loggingLevel = Logging_level.warn;
        eventType = "Unauthorized";
    } else if (err instanceof ForbiddenError) {
        statusCode = err.status;
        message = err.message;
        loggingLevel = Logging_level.warn;
        eventType = "Forbidden";
    } else if (err instanceof NotFoundError) {
        statusCode = err.status;
        message = err.message;
        loggingLevel = Logging_level.info;
        eventType = "NotFound";
    } else if (err instanceof ValidationError) {
        statusCode = err.status;
        message = err.message;
        loggingLevel = Logging_level.warn;
        eventType = "ValidationError";
    }
    // Handle Sequelize Errors
    else if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 400;
        message = err.errors.map(e => e.message).join(', ');
        loggingLevel = Logging_level.warn;
        eventType = "DatabaseValidation";
    }
    // Handle other errors that might have status/statusCode attached (e.g. from 3rd party libs)
    else if (err.status || err.statusCode) {
        statusCode = err.status || err.statusCode;
        message = err.message;
        if (statusCode >= 400 && statusCode < 500) {
            loggingLevel = Logging_level.warn;
            eventType = "ClientError";
        }
    } else {
        message = err.message || "Internal Server Error";
    }

    Logging(
        loggingLevel,
        Entity.Middleware || "MW",
        eventType,
        `Req: ${req.method} ${req.url} - Msg: ${message}`,
        "ErrorHandler"
    );

    // console.log("stack", err.stack); // Optional: keep for dev debugging

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
    });
}

module.exports = ErrorHandler;
