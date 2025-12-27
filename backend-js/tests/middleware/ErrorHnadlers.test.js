const ErrorHandler = require('../../src/middleware/ErrorHnadlers');
const BadRequestError = require('../../src/customerror/BadRequest');
const NotFoundError = require('../../src/customerror/NotFound');
const Logging = require('../../src/utils/Logger');
const { Logging_level } = require('../../src/utils/LoggerParams');

jest.mock('../../src/utils/Logger');
jest.mock('../../src/utils/LoggerParams', () => ({
    Logging_level: { info: 'info', warn: 'warn', error: 'error' },
    Entity: { Middleware: 'Middleware' },
    Events: {},
    Models: {}
}));

describe('ErrorHandler Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            method: 'GET',
            url: '/test'
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    it('should handle BadRequestError', () => {
        const err = new BadRequestError('Bad Request');
        ErrorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 400,
            message: 'Bad Request'
        }));
        expect(Logging).toHaveBeenCalledWith(
            'warn',
            expect.anything(),
            'BadRequest',
            expect.stringContaining('Bad Request'),
            'ErrorHandler'
        );
    });

    it('should handle NotFoundError', () => {
        const err = new NotFoundError('Not Found');
        ErrorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 404,
            message: 'Not Found'
        }));
        expect(Logging).toHaveBeenCalledWith(
            'info',
            expect.anything(),
            'NotFound',
            expect.stringContaining('Not Found'),
            'ErrorHandler'
        );
    });

    it('should handle SequelizeValidationError', () => {
        const err = {
            name: 'SequelizeValidationError',
            errors: [{ message: 'Field required' }, { message: 'Invalid value' }]
        };
        ErrorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 400,
            message: 'Field required, Invalid value'
        }));
    });

    it('should handle Generic Error as 500', () => {
        const err = new Error('Something went wrong');
        ErrorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 500,
            message: 'Something went wrong'
        }));
        expect(Logging).toHaveBeenCalledWith(
            'error',
            expect.anything(),
            'ServerError',
            expect.stringContaining('Something went wrong'),
            'ErrorHandler'
        );
    });

    it('should handle error with status property', () => {
        const err = new Error('Client Error');
        err.status = 418;
        ErrorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(418);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 418,
            message: 'Client Error'
        }));
        // ClientError checking
        expect(Logging).toHaveBeenCalledWith(
            'warn',
            expect.anything(),
            'ClientError',
            expect.stringContaining('Client Error'),
            'ErrorHandler'
        );
    });
});
