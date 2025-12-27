const UsersController = require('../../src/Controller/UsersController');
const UsersService = require('../../src/services/UsersService');

jest.mock('../../src/services/UsersService');

describe('UsersController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('signInUser', () => {
        it('should throw ValidationError if body invalid', async () => {
            req.body = {};
            await expect(UsersController.signInUser(req, res))
                .rejects.toThrow();
        });

        it('should create user and return 201', async () => {
            req.body = {
                username: 'test',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com'
            };
            UsersService.signInUser.mockResolvedValue({ userId: '1', jwt: 'token ' });

            await UsersController.signInUser(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ userId: '1' }));
        });
    });

    describe('loginUser', () => {
        it('should throw ValidationError if body invalid', async () => {
            req.body = {};
            await expect(UsersController.loginUser(req, res))
                .rejects.toThrow();
        });

        it('should throw BadRequestError for invalid password', async () => {
            req.body = { email: 'test@example.com', password: 'wrong' };
            UsersService.loginUser.mockRejectedValue(new Error("Invalid password"));

            await expect(UsersController.loginUser(req, res))
                .rejects.toThrow("Invalid password");
        });

        it('should throw NotFoundError if user not found', async () => {
            req.body = { email: 'test@example.com', password: 'password' };
            UsersService.loginUser.mockResolvedValue(null);

            await expect(UsersController.loginUser(req, res))
                .rejects.toThrow("User not found");
        });

        it('should return token if success', async () => {
            req.body = { email: 'test@example.com', password: 'password' };
            UsersService.loginUser.mockResolvedValue({ userId: '1', jwt: 'token' });

            await UsersController.loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ userId: '1', jwt: 'token' });
        });
    });

    describe('getUsersById', () => {
        it('should throw BadRequestError if userId missing', async () => {
            await expect(UsersController.getUsersById(req, res))
                .rejects.toThrow("User ID is required");
        });

        it('should throw NotFoundError if user not found', async () => {
            req.params.userId = '1';
            UsersService.getUserById.mockResolvedValue(null);

            await expect(UsersController.getUsersById(req, res))
                .rejects.toThrow("User not found");
        });

        it('should return user', async () => {
            req.params.userId = '1';
            const mockUser = { id: '1', username: 'test' };
            UsersService.getUserById.mockResolvedValue(mockUser);

            await UsersController.getUsersById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: mockUser });
        });
    });

    describe('getAllUsers', () => {
        it('should return empty list if no users', async () => {
            UsersService.getAllUsers.mockResolvedValue([]);

            await UsersController.getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: [] });
        });

        it('should return users', async () => {
            const mockUsers = [{ id: '1' }];
            UsersService.getAllUsers.mockResolvedValue(mockUsers);

            await UsersController.getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: mockUsers });
        });
    });

    describe('updateProfileData', () => {
        it('should throw BadRequestError if userId missing', async () => {
            await expect(UsersController.updateProfileData(req, res))
                .rejects.toThrow("User ID is required");
        });

        it('should throw ValidationError if invalid updates', async () => {
            req.params.userId = '1';
            req.body = { username: 123 }; // Should be string

            await expect(UsersController.updateProfileData(req, res))
                .rejects.toThrow();
        });

        it('should throw NotFoundError if update fails', async () => {
            req.params.userId = '1';
            req.body = { username: 'new' };
            UsersService.updateProfileData.mockResolvedValue(null);

            await expect(UsersController.updateProfileData(req, res))
                .rejects.toThrow("User not found");
        });

        it('should return updated user', async () => {
            req.params.userId = '1';
            req.body = { username: 'new' };
            UsersService.updateProfileData.mockResolvedValue({ id: '1', username: 'new' });

            await UsersController.updateProfileData(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: { id: '1', username: 'new' } });
        });
    });

    describe('deleteUsers', () => {
        it('should throw BadRequestError if userId missing', async () => {
            await expect(UsersController.deleteUsers(req, res))
                .rejects.toThrow("User ID is required");
        });

        it('should throw NotFoundError if delete fails', async () => {
            req.params.userId = '1';
            UsersService.deleteUser.mockResolvedValue(false);

            await expect(UsersController.deleteUsers(req, res))
                .rejects.toThrow("User not found or already deleted");
        });

        it('should return success message', async () => {
            req.params.userId = '1';
            UsersService.deleteUser.mockResolvedValue(true);

            await UsersController.deleteUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Successfully deleted" });
        });
    });
});
