const RolePermInjector = require('../../src/middleware/RolePermInjector');
const Roles = require('../../src/models/Roles');
const Permission = require('../../src/models/Permissions');

jest.mock('../../src/models/Roles');
jest.mock('../../src/models/Permissions');
jest.mock('../../src/models/Users');
jest.mock('sequelize', () => {
    const mSequelize = {
        authenticate: jest.fn(),
        sync: jest.fn(),
        define: jest.fn(() => ({
            belongsTo: jest.fn(),
            hasMany: jest.fn(),
            belongsToMany: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            destroy: jest.fn(),
            save: jest.fn(),
            build: jest.fn()
        }))
    };
    const mConstructor = jest.fn(() => mSequelize);
    mConstructor.Op = { in: 'in' };
    mConstructor.DataTypes = {
        UUID: 'UUID',
        UUIDV4: 'UUIDV4',
        STRING: jest.fn(),
        INTEGER: 'INTEGER',
        BOOLEAN: 'BOOLEAN',
        DATE: 'DATE',
        NOW: 'NOW',
        TEXT: jest.fn(),
        ENUM: jest.fn(),
        ARRAY: jest.fn()
    };
    Object.assign(mConstructor, mConstructor.DataTypes);
    mConstructor.Sequelize = mConstructor;
    return mConstructor;
});

describe('RolePermInjector Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            UserRole: []
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    it('should call next with empty permissions if no roles', async () => {
        req.UserRole = [];
        Roles.findAll.mockResolvedValue([]);

        await RolePermInjector(req, res, next);

        expect(Roles.findAll).toHaveBeenCalledWith(expect.objectContaining({
            where: { name: { in: [] } }
        }));
        expect(req.permissions).toBeInstanceOf(Set);
        expect(req.permissions.size).toBe(0);
        expect(next).toHaveBeenCalled();
    });

    it('should inject permissions based on roles', async () => {
        req.UserRole = [{ name: 'Admin' }, { name: 'User' }];
        const mockRoles = [
            {
                Permissions: [
                    { PermissionName: 'create_post' },
                    { PermissionName: 'read_post' }
                ]
            },
            {
                Permissions: [
                    { PermissionName: 'read_post' }, // Duplicate, should be deduplicated by Set
                    { PermissionName: 'comment' }
                ]
            }
        ];
        Roles.findAll.mockResolvedValue(mockRoles);

        await RolePermInjector(req, res, next);

        expect(Roles.findAll).toHaveBeenCalledWith(expect.objectContaining({
            where: { name: { in: ['Admin', 'User'] } }
        }));
        expect(req.permissions).toBeInstanceOf(Set);
        expect(req.permissions.has('create_post')).toBe(true);
        expect(req.permissions.has('read_post')).toBe(true);
        expect(req.permissions.has('comment')).toBe(true);
        expect(req.permissions.size).toBe(3);
        expect(next).toHaveBeenCalled();
    });

    it('should handle error and return 500', async () => {
        req.UserRole = [{ name: 'Admin' }];
        Roles.findAll.mockRejectedValue(new Error('DB Error'));

        await RolePermInjector(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });

    it('should not call next if Roles.findAll returns null', async () => {
        req.UserRole = [{ name: 'Admin' }];
        Roles.findAll.mockResolvedValue(null);

        const result = await RolePermInjector(req, res, next);

        expect(result).toBeNull();
        expect(next).not.toHaveBeenCalled();
    });
});
