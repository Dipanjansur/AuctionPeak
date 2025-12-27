const BidsService = require('../../src/services/BidsService');
const Bids = require('../../src/models/Bids');
const Items = require('../../src/models/Items');
const { Auction } = require('../../src/models/Auctions');
const Logging = require('../../src/utils/Logger');

// Mock dependencies
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
jest.mock('../../src/models/Users', () => ({ // Mock Users to prevent circular load issues
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

jest.mock('../../src/utils/Logger');
jest.mock('../../src/utils/LoggerParams', () => ({
    Logging_level: { info: 'info', warn: 'warn', error: 'error' },
    Entity: { Service: 'Service' },
    Events: { READ_OP: 'READ_OP', CREATE_OP: 'CREATE_OP', UPDATE_OP: 'UPDATE_OP', DELETE_OP: 'DELETE_OP' },
    Models: { Bids: 'Bids' }
}));

describe('BidsService', () => {
    let mockUser;
    let mockPermissions;
    let mockBidInstance;

    beforeEach(() => {
        jest.clearAllMocks();

        mockUser = {
            userId: 'user-123',
            usersId: 'user-123'
        };

        mockPermissions = new Set();

        mockBidInstance = {
            BidsId: 'bid-123',
            amount: 100,
            createdBy: 'user-123',
            toJSON: jest.fn().mockReturnThis(),
            save: jest.fn(),
            dataValues: {} // Add this just in case
        };
        mockBidInstance.toJSON.mockReturnValue(mockBidInstance);
        mockBidInstance.dataValues = { ...mockBidInstance };
    });

    describe('getAllBids', () => {
        it('should return empty list if no bids found', async () => {
            Bids.findAll.mockResolvedValue([]);

            const result = await BidsService.getAllBids(mockUser, mockPermissions);

            expect(result).toEqual([]);
        });

        it('should return bids with permissions', async () => {
            Bids.findAll.mockResolvedValue([mockBidInstance]);
            mockPermissions.add('view_bids');

            const result = await BidsService.getAllBids(mockUser, mockPermissions);

            expect(result).toHaveLength(1);
            // Since mockBidInstance.createdBy === user.userId ('user-123')
            // It should have owner permissions
            expect(result[0].permission).toEqual(expect.arrayContaining([
                'all_bids',
                'view_bids',
                'create_bids',
                'update_bids',
                'delete_bids'
            ]));
        });
    });

    describe('getBidsById', () => {
        it('should return null if bid not found', async () => {
            Bids.findOne.mockResolvedValue(null);

            const result = await BidsService.getBidsById('bid-123', mockUser, mockPermissions);

            expect(result).toBeNull();
        });

        it('should return bid if found', async () => {
            Bids.findOne.mockResolvedValue(mockBidInstance);

            const result = await BidsService.getBidsById('bid-123', mockUser, mockPermissions);

            expect(result.BidsId).toBe('bid-123');
        });
    });

    describe('createNewBid', () => {
        it('should throw error if insufficient permissions', async () => {
            const payload = { amount: 100, ItemId: 'item-1' };
            await expect(BidsService.createNewBid(mockUser, mockPermissions, payload))
                .rejects.toThrow("Insufficient permissions to create bid");
        });

        it('should throw error if item not found', async () => {
            mockPermissions.add('create_bids');
            Items.findOne.mockResolvedValue(null);

            const payload = { amount: 100, ItemId: 'item-1' };
            await expect(BidsService.createNewBid(mockUser, mockPermissions, payload))
                .rejects.toThrow("Item not found");
        });

        it('should create bid if valid', async () => {
            mockPermissions.add('create_bids');
            Items.findOne.mockResolvedValue({
                auctionId: 'auction-1',
                dataValues: { auctionId: 'auction-1' }
            });
            Bids.create.mockResolvedValue({
                BidsId: 'new-bid',
                amount: 100,
                toJSON: () => ({ BidsId: 'new-bid', amount: 100 })
            });

            const payload = { amount: 100, ItemId: 'item-1' };
            const result = await BidsService.createNewBid(mockUser, mockPermissions, payload);

            expect(Bids.create).toHaveBeenCalled();
            expect(result.BidsId).toBe('new-bid');
        });
    });

    describe('updateBid', () => {
        it('should return null if bid not found', async () => {
            Bids.findOne.mockResolvedValue(null);

            const result = await BidsService.updateBid('bid-123', mockUser, mockPermissions, {});

            expect(result).toBeNull();
        });

        it('should update bid amount', async () => {
            Bids.findOne.mockResolvedValue(mockBidInstance);
            const updates = { amount: 200 };

            const result = await BidsService.updateBid('bid-123', mockUser, mockPermissions, updates);

            expect(mockBidInstance.amount).toBe(200);
            expect(mockBidInstance.save).toHaveBeenCalled();
            expect(result.amount).toBe(200);
        });
    });

    describe('deleteBid', () => {
        it('should return false if deletion fails', async () => {
            Bids.destroy.mockResolvedValue(0);

            const result = await BidsService.deleteBid('bid-123', mockUser, mockPermissions);

            expect(result).toBe(false);
        });

        it('should return true if deletion successful', async () => {
            Bids.destroy.mockResolvedValue(1);

            const result = await BidsService.deleteBid('bid-123', mockUser, mockPermissions);

            expect(result).toBe(true);
        });
    });
});
