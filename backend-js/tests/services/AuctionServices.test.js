const ActionsServices = require('../../src/services/AuctionServices'); // fix typo if any, but filename is AuctionServices.js
const AuctionServices = require('../../src/services/AuctionServices');
const { Auction, AuctionParticipants } = require('../../src/models/Auctions');
const ItemsService = require('../../src/services/ItemsService');
const Logging = require('../../src/utils/Logger');
const { formatTimeDifference } = require('../../src/utils/timeUtils');

// Mock dependencies
jest.mock('../../src/models/Auctions', () => ({
    Auction: {
        belongsTo: jest.fn(),
        hasMany: jest.fn(),
        belongsToMany: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
        save: jest.fn(),
        build: jest.fn()
    },
    AuctionParticipants: {
        belongsTo: jest.fn(),
        hasMany: jest.fn(),
        belongsToMany: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
        save: jest.fn(),
        build: jest.fn()
    }
}));
// We must mock Users and Items to prevent circular dependency triggers during load
jest.mock('../../src/models/Users', () => ({
    belongsTo: jest.fn(),
    hasMany: jest.fn(),
    belongsToMany: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    save: jest.fn(),
    build: jest.fn()
}));
jest.mock('../../src/models/Items', () => ({
    belongsTo: jest.fn(),
    hasMany: jest.fn(),
    belongsToMany: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    save: jest.fn(),
    build: jest.fn()
}));
jest.mock('../../src/models/Bids', () => ({
    belongsTo: jest.fn(),
    hasMany: jest.fn(),
    belongsToMany: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    save: jest.fn(),
    build: jest.fn()
}));

jest.mock('../../src/services/ItemsService', () => ({
    getItemByAuctionId: jest.fn(),
    getAllItems: jest.fn(),
    getItemById: jest.fn(),
    createNewItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn()
}));
jest.mock('../../src/utils/Logger');
jest.mock('../../src/utils/timeUtils');
jest.mock('../../src/utils/LoggerParams', () => ({
    Logging_level: { info: 'info', warn: 'warn', error: 'error' },
    Entity: { Service: 'Service' },
    Events: { READ_OP: 'READ_OP', CREATE_OP: 'CREATE_OP', UPDATE_OP: 'UPDATE_OP', DELETE_OP: 'DELETE_OP' },
    Models: { Auction: 'Auction' }
}));

describe('AuctionServices', () => {
    let mockUser;
    let mockPermissions;
    let mockAuctionInstance;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Default mock user
        mockUser = {
            usersId: 'user-123',
            userId: 'user-123'
        };

        // Default mock permissions
        mockPermissions = new Set();

        // Mock Instance Behavior
        mockAuctionInstance = {
            AuctionId: 'auction-123',
            name: 'Test Auction',
            startTime: new Date(Date.now() + 10000), // Future
            endTime: new Date(Date.now() + 20000),   // Future
            createdBy: 'user-123',
            toJSON: jest.fn().mockReturnThis(),
            save: jest.fn()
        };
        mockAuctionInstance.dataValues = { ...mockAuctionInstance };
        mockAuctionInstance.toJSON.mockReturnValue(mockAuctionInstance);
    });

    describe('getAllAuctions', () => {
        it('should return empty list if no auctions found', async () => {
            Auction.findAll.mockResolvedValue([]);
            mockPermissions.add('create_auction');

            const result = await AuctionServices.getAllAuctions(mockUser, mockPermissions);

            expect(result.auctions).toEqual([]);
            expect(result.createAuction).toBe(true);
            expect(Auction.findAll).toHaveBeenCalledTimes(1);
        });

        it('should return auctions with permissions and activity status', async () => {
            Auction.findAll.mockResolvedValue([mockAuctionInstance]);
            AuctionParticipants.findOne.mockResolvedValue(null); // Not a participant
            formatTimeDifference.mockReturnValue('10 mins');

            mockPermissions.add('view_auction');

            // Mock Date for consistent testing of markActivity
            const realDate = Date;
            global.Date = class extends Date {
                constructor(date) {
                    if (date) return super(date);
                    return new Date('2023-01-01T12:00:00Z');
                }
            };

            // Adjust mock auction times relative to fixed current time
            mockAuctionInstance.startTime = new Date('2023-01-01T12:10:00Z');
            mockAuctionInstance.endTime = new Date('2023-01-01T12:20:00Z');
            mockAuctionInstance.dataValues = { ...mockAuctionInstance };

            const result = await AuctionServices.getAllAuctions(mockUser, mockPermissions);

            expect(result.auctions).toHaveLength(1);
            expect(result.auctions[0].permission).toContain('join_auction');
            expect(result.auctions[0].permission).toContain('update_auction'); // Is Owner
            expect(result.auctions[0].active).toBe(1); // Future

            global.Date = realDate;
        });

        it('should reflect admin permissions', async () => {
            // Mock Date for consistent testing of markActivity
            const realDate = Date;
            global.Date = class extends Date {
                constructor(date) {
                    if (date) return super(date);
                    return new Date('2023-01-01T12:00:00Z');
                }
            };

            mockAuctionInstance.createdBy = 'other-user';
            mockAuctionInstance.startTime = new Date('2023-01-01T12:10:00Z');
            mockAuctionInstance.endTime = new Date('2023-01-01T12:20:00Z');
            mockAuctionInstance.dataValues = { ...mockAuctionInstance };

            Auction.findAll.mockResolvedValue([mockAuctionInstance]);
            AuctionParticipants.findOne.mockResolvedValue(null);

            mockPermissions.add('all_auction'); // Admin access

            const result = await AuctionServices.getAllAuctions(mockUser, mockPermissions);

            expect(result.auctions[0].permission).toEqual(expect.arrayContaining(['all_auction', 'add_items', 'join_auction']));
            expect(result.createAuction).toBe(true);

            global.Date = realDate;
        });
    });

    describe('getAuctionById', () => {
        it('should return null if auction not found', async () => {
            Auction.findOne.mockResolvedValue(null);

            const result = await AuctionServices.getAuctionById('invalid-id', mockUser, mockPermissions);

            expect(result).toBeNull();
            expect(Logging).toHaveBeenCalled();
        });

        it('should return auction with items and permissions', async () => {
            mockAuctionInstance.AuctionId = 'auction-123';
            Auction.findOne.mockResolvedValue(mockAuctionInstance);

            // Explicitly set implementation to verify return value
            ItemsService.getItemByAuctionId.mockImplementation(async () => {
                console.log('DEBUG: getItemByAuctionId mock called');
                return [{ ItemId: 'item-1' }];
            });

            AuctionParticipants.findOne.mockResolvedValue(null);
            // Mock Date for consistent testing of markActivity
            const realDate = Date;
            global.Date = class extends Date {
                constructor(date) {
                    if (date) return super(date);
                    return new Date('2023-01-01T12:00:00Z');
                }
            };
            // Adjust mock auction times relative to fixed current time
            mockAuctionInstance.startTime = new Date('2023-01-01T12:10:00Z');
            mockAuctionInstance.endTime = new Date('2023-01-01T12:20:00Z');
            mockAuctionInstance.dataValues = { ...mockAuctionInstance };

            const result = await AuctionServices.getAuctionById('auction-123', mockUser, mockPermissions);
            console.log('DEBUG: Result Items:', result.items);

            expect(result).toBeDefined();
            expect(result.items).toHaveLength(1);
            expect(ItemsService.getItemByAuctionId).toHaveBeenCalledWith('auction-123', mockUser, mockPermissions);
            global.Date = realDate;
        });
    });

    describe('createAuction', () => {
        it('should throw error if insufficient permissions', async () => {
            const payload = { name: 'New Auction' };
            await expect(AuctionServices.createAuction(mockUser, mockPermissions, payload))
                .rejects.toThrow("Insufficient permissions to create an auction");
        });

        it('should create auction if user has permission', async () => {
            mockPermissions.add('create_auction'); // Correct permission key from Service "create_auction"
            // Actually service checks PERMISSIONS.CREATE which is "create_auction" locally defined but globalAuctionPermission is used
            const payload = {
                name: 'New Auction',
                startTime: 100,
                duration: 50,
                AuctionDetails: {},
                auctionPic: 'pic.jpg'
            };

            Auction.create.mockResolvedValue({ AuctionId: 'new-id', ...payload });

            const result = await AuctionServices.createAuction(mockUser, mockPermissions, payload);

            expect(Auction.create).toHaveBeenCalled();
            expect(result.AuctionId).toBe('new-id');
        });
    });

    describe('updateAuction', () => {
        it('should return null if auction not found', async () => {
            Auction.findOne.mockResolvedValue(null);
            mockPermissions.add('update_auction'); // or global update

            const result = await AuctionServices.updateAuction('auction-123', mockUser, mockPermissions, {});

            expect(result).toBeNull();
        });

        it('should update auction and return formatted object', async () => {
            // Mock Date for consistent testing of markActivity
            const realDate = Date;
            global.Date = class extends Date {
                constructor(date) {
                    if (date) return super(date);
                    return new Date('2023-01-01T12:00:00Z');
                }
            };
            mockAuctionInstance.startTime = new Date('2023-01-01T12:10:00Z');
            mockAuctionInstance.endTime = new Date('2023-01-01T12:20:00Z');
            mockAuctionInstance.dataValues = { ...mockAuctionInstance };

            Auction.findOne.mockResolvedValue(mockAuctionInstance);
            AuctionParticipants.findOne.mockResolvedValue(null);
            mockPermissions.add('update_auction'); // Basic update perms, assume owner

            const updates = { name: 'Updated Name' };

            const result = await AuctionServices.updateAuction('auction-123', mockUser, mockPermissions, updates);

            expect(mockAuctionInstance.name).toBe('Updated Name');
            expect(mockAuctionInstance.save).toHaveBeenCalled();
            expect(result.name).toBe('Updated Name');

            global.Date = realDate;
        });
    });

    describe('deleteAuction', () => {
        it('should return false if deletion fails (not found/permission)', async () => {
            Auction.destroy.mockResolvedValue(0);

            const result = await AuctionServices.deleteAuction('auction-123', mockUser, mockPermissions);

            expect(result).toBe(false);
        });

        it('should return true if deletion successful', async () => {
            Auction.destroy.mockResolvedValue(1);

            const result = await AuctionServices.deleteAuction('auction-123', mockUser, mockPermissions);

            expect(result).toBe(true);
        });
    });
});
