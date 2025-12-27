const UsersService = require('../../src/services/UsersService');
const Users = require('../../src/models/Users');
const bcrypt = require('bcryptjs');
const { generateAuthToken } = require('../../src/utils/JwtHelper');
const Logging = require('../../src/utils/Logger');

jest.mock('../../src/models/Users');
jest.mock('bcryptjs');
jest.mock('../../src/utils/JwtHelper');
jest.mock('../../src/utils/Logger');
jest.mock('../../src/utils/LoggerParams', () => ({
    Logging_level: { info: 'info', warn: 'warn', error: 'error' },
    Entity: { Service: 'Service' },
    Events: { READ_OP: 'READ_OP', CREATE_OP: 'CREATE_OP', UPDATE_OP: 'UPDATE_OP', DELETE_OP: 'DELETE_OP' },
    Models: { Users: 'Users' }
}));

describe('UsersService', () => {
    let mockUser;

    beforeEach(() => {
        jest.clearAllMocks();

        mockUser = {
            usersId: 'user-123',
            username: 'testuser',
            password: 'hashedPassword',
            email: 'test@example.com',
            save: jest.fn(),
            toJSON: jest.fn().mockReturnThis()
        };
    });

    describe('signInUser', () => {
        it('should create user and return token', async () => {
            const userData = {
                username: 'newuser',
                password: 'password123',
                email: 'new@example.com'
            };

            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');
            Users.create.mockResolvedValue({
                usersId: 'new-id',
                ...userData,
                password: 'hashedPassword'
            });
            generateAuthToken.mockReturnValue('jwt-token');

            const result = await UsersService.signInUser(userData);

            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'salt');
            expect(Users.create).toHaveBeenCalled();
            expect(result).toEqual({ userId: 'new-id', jwt: 'jwt-token' });
        });
    });

    describe('loginUser', () => {
        it('should return null if user not found', async () => {
            Users.findOne.mockResolvedValue(null);

            const result = await UsersService.loginUser('wrong@example.com', 'password');

            expect(result).toBeNull();
        });

        it('should throw error if password mismatch', async () => {
            Users.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(false);

            await expect(UsersService.loginUser('test@example.com', 'wrongpassword'))
                .rejects.toThrow("Invalid password");
        });

        it('should return token if login successful', async () => {
            Users.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            generateAuthToken.mockReturnValue('jwt-token');

            const result = await UsersService.loginUser('test@example.com', 'password');

            expect(result).toEqual({ userId: 'user-123', jwt: 'jwt-token' });
        });
    });

    describe('getUserById', () => {
        it('should return null if user not found', async () => {
            Users.findOne.mockResolvedValue(null);

            const result = await UsersService.getUserById('invalid-id');

            expect(result).toBeNull();
        });

        it('should return user excluding password', async () => {
            Users.findOne.mockResolvedValue(mockUser);

            const result = await UsersService.getUserById('user-123');

            expect(result).toBeDefined();
            expect(Users.findOne).toHaveBeenCalledWith(expect.objectContaining({
                attributes: { exclude: ['password'] }
            }));
        });
    });

    describe('getAllUsers', () => {
        it('should return empty list if no users', async () => {
            Users.findAll.mockResolvedValue([]);

            const result = await UsersService.getAllUsers();

            expect(result).toEqual([]);
        });

        it('should return all users', async () => {
            Users.findAll.mockResolvedValue([mockUser]);

            const result = await UsersService.getAllUsers();

            expect(result).toHaveLength(1);
        });
    });

    describe('updateProfileData', () => {
        it('should return null if user not found', async () => {
            Users.findOne.mockResolvedValue(null);

            const result = await UsersService.updateProfileData('user-123', {});

            expect(result).toBeNull();
        });

        it('should update allowed fields', async () => {
            Users.findOne.mockResolvedValue(mockUser);
            const updates = {
                username: 'updatedUser',
                firstName: 'New',
                bio: 'New Bio',
                password: 'shouldNotUpdateThisDirectly'
            };

            const result = await UsersService.updateProfileData('user-123', updates);

            expect(mockUser.username).toBe('updatedUser');
            expect(mockUser.firstName).toBe('New');
            expect(mockUser.bio).toBe('New Bio');
            expect(mockUser.password).toBe('hashedPassword'); // Should not change via this method based on code logic

            expect(mockUser.save).toHaveBeenCalled();
        });
    });

    describe('deleteUser', () => {
        it('should return false if deletion fails', async () => {
            Users.destroy.mockResolvedValue(0);

            const result = await UsersService.deleteUser('user-123');

            expect(result).toBe(false);
        });

        it('should return true if deletion successful', async () => {
            Users.destroy.mockResolvedValue(1);

            const result = await UsersService.deleteUser('user-123');

            expect(result).toBe(true);
        });
    });
});
