const isAuthticated = require('../../src/middleware/isAuthticated');
const jwt = require('jsonwebtoken');
const Users = require('../../src/models/Users');
const Logging = require('../../src/utils/Logger');

jest.mock('jsonwebtoken');
jest.mock('../../src/models/Users');
jest.mock('../../src/utils/Logger');
jest.mock('../../src/utils/LoggerParams', () => ({
    Logging_level: { info: 'info', error: 'error' },
    Entity: { Middleware: 'Middleware' },
    Events: { JWT_VALIDATIONS: 'JWT_VALIDATIONS', READ_OP: 'READ_OP' },
    Models: { Users: 'Users', Roles: 'Roles' }
}));

describe('isAuthticated Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            header: jest.fn()
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    it('should return 401 if Authorization header is missing', async () => {
        req.header.mockReturnValue(null);
        await isAuthticated(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Access denied' });
    });

    it('should return 401 if token format is incorrect', async () => {
        req.header.mockReturnValue('InvalidToken');
        await isAuthticated(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token is not Appropiate' });
    });

    it('should return 401 if token validation fails', async () => {
        req.header.mockReturnValue('Bearer validtoken');
        jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

        await isAuthticated(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    });

    it('should return 404 if user not found', async () => {
        req.header.mockReturnValue('Bearer validtoken');
        jwt.verify.mockReturnValue({ _id: '1', email: 'test@example.com' });
        Users.findOne.mockResolvedValue(null);

        await isAuthticated(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: { message: 'invalid token' } }));
    });

    it('should return 404 if email mismatch', async () => {
        req.header.mockReturnValue('Bearer validtoken');
        jwt.verify.mockReturnValue({ _id: '1', email: 'test@example.com' });
        Users.findOne.mockResolvedValue({ usersId: '1', email: 'wrong@example.com' });

        await isAuthticated(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: { message: 'invalid token' } }));
    });

    it('should return 404 if user has no roles', async () => {
        req.header.mockReturnValue('Bearer validtoken');
        jwt.verify.mockReturnValue({ _id: '1', email: 'test@example.com' });
        Users.findOne.mockResolvedValue({
            usersId: '1',
            email: 'test@example.com'
            // Roles undefined
        });

        await isAuthticated(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: { message: 'No valid User Roles Assiociated to the user' } }));
    });

    it('should call next if authentication successful', async () => {
        req.header.mockReturnValue('Bearer validtoken');
        jwt.verify.mockReturnValue({ _id: '1', email: 'test@example.com' });
        const mockUser = {
            usersId: '1',
            email: 'test@example.com',
            Roles: [{ RoleId: 1, name: 'Admin' }]
        };
        Users.findOne.mockResolvedValue(mockUser);

        await isAuthticated(req, res, next);

        expect(req.user).toEqual(mockUser);
        expect(req.UserRole).toEqual(mockUser.Roles);
        expect(next).toHaveBeenCalled();
    });
});
