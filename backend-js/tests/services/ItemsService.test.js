const ItemsService = require('../../src/services/ItemsService');
const Items = require('../../src/models/Items');
const { AuctionItems, AuctionParticipants, Auction } = require('../../src/models/Auctions');
const Bids = require('../../src/models/Bids');
const Logging = require('../../src/utils/Logger');
const { formatTimeDifference } = require('../../src/utils/timeUtils');

// Mock dependencies
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
    },
    AuctionItems: {
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
jest.mock('../../src/utils/timeUtils');
jest.mock('../../src/utils/LoggerParams', () => ({
    Logging_level: { info: 'info', warn: 'warn', error: 'error' },
    Entity: { Service: 'Service' },
    Events: { READ_OP: 'READ_OP', CREATE_OP: 'CREATE_OP', UPDATE_OP: 'UPDATE_OP', DELETE_OP: 'DELETE_OP' },
    Models: { Items: 'Items' }
}));

describe('ItemsService', () => {
    let mockUser;
    let mockPermissions;
    let mockItemInstance;

    beforeEach(() => {
        jest.clearAllMocks();

        mockUser = {
            usersId: 'user-123',
            userId: 'user-123'
        };

        mockPermissions = new Set();

        mockItemInstance = {
            ItemId: 'item-123',
            ItemName: 'Test Item',
            Owner: 'user-123',
            BiddingStartTime: new Date(Date.now() + 10000),
            BiddingEndTime: new Date(Date.now() + 20000),
            toJSON: function () { return { ...this, ...this.dataValues }; },
            save: jest.fn(),
            dataValues: {}
        };
        mockItemInstance.dataValues = { ...mockItemInstance };
        // Remove the separate initialization of toJSON return value since we defined it above
        // mockItemInstance.toJSON.mockReturnValue(mockItemInstance);

        // Default mock for permissions check
        AuctionParticipants.findAll.mockResolvedValue([]);
    });

    describe('getAllItems', () => {
        it('should throw error if user has no view permissions', async () => {
            // Mock permissions to contain nothing
            await expect(ItemsService.getAllItems(mockUser, mockPermissions, {}))
                .rejects.toThrow("Insufficient permission to view items");
        });

        it('should return items restricted by scope if basic view', async () => {
            mockPermissions.add('view_items');
            AuctionParticipants.findAll.mockResolvedValue([
                { dataValues: { auctionId: 'auction-1' } }
            ]);
            Items.findAll.mockResolvedValue([mockItemInstance]);

            // Mock Date for activity check
            const realDate = Date;
            global.Date = class extends Date {
                constructor(date) {
                    if (date) return super(date);
                    return new Date('2023-01-01T12:00:00Z');
                }
            };
            mockItemInstance.BiddingStartTime = new Date('2023-01-01T12:10:00Z');
            mockItemInstance.BiddingEndTime = new Date('2023-01-01T12:20:00Z');
            mockItemInstance.dataValues = { ...mockItemInstance };

            const result = await ItemsService.getAllItems(mockUser, mockPermissions, {});

            expect(result.items).toHaveLength(1);
            expect(result.items[0].permission).toContain('update_items'); // Owner

            global.Date = realDate;
        });

        it('should filter by auction if query param provided', async () => {
            mockPermissions.add('view_items');
            AuctionItems.findAll.mockResolvedValue([
                { dataValues: { itemItemId: 'item-123' } }
            ]);
            Items.findAll.mockResolvedValue([mockItemInstance]);

            const result = await ItemsService.getAllItems(mockUser, mockPermissions, { auction: 'auction-1' });

            expect(AuctionItems.findAll).toHaveBeenCalledWith(expect.objectContaining({
                where: { auctionId: 'auction-1' }
            }));
            expect(result.items).toHaveLength(1);
        });

        it('should return null if auction has no items', async () => {
            mockPermissions.add('view_items');
            AuctionItems.findAll.mockResolvedValue([]);

            const result = await ItemsService.getAllItems(mockUser, mockPermissions, { auction: 'empty-auction' });

            expect(result).toBeNull();
        });
    });

    describe('getItemByAuctionId', () => {
        it('should return items for auction', async () => {
            Items.findAll.mockResolvedValue([mockItemInstance]);

            const result = await ItemsService.getItemByAuctionId('auction-1', mockUser, mockPermissions);

            expect(result).toHaveLength(1);
            expect(Items.findAll).toHaveBeenCalledWith({ where: { auctionId: 'auction-1' } });
        });
    });

    describe('getItemById', () => {
        it('should return null if item not found', async () => {
            mockPermissions.add('view_items');
            Items.findOne.mockResolvedValue(null);

            const result = await ItemsService.getItemById('item-123', mockUser, mockPermissions);

            expect(result).toBeNull();
        });

        it('should return item with bids', async () => {
            mockPermissions.add('view_items');
            Items.findOne.mockResolvedValue(mockItemInstance);
            Bids.findAll.mockResolvedValue([{ BidsId: 'bid-1' }]);

            const result = await ItemsService.getItemById('item-123', mockUser, mockPermissions);

            expect(result).toBeDefined();
            expect(result.bids).toHaveLength(1);
        });
    });

    describe('createNewItem', () => {
        it('should throw error if insufficient permissions', async () => {
            const payload = { ItemName: 'New Item' };
            await expect(ItemsService.createNewItem(mockUser, mockPermissions, payload))
                .rejects.toThrow("Insufficient permission to create item");
        });

        it('should create item if allowed', async () => {
            mockPermissions.add('create_items');
            const payload = { ItemName: 'New Item', Bio: 'Bio', Status: 'open', ItemDescription: 'Desc', CurrentPrice: 10 };
            Items.create.mockResolvedValue({ ItemId: 'new-item', ...payload });

            const result = await ItemsService.createNewItem(mockUser, mockPermissions, payload);

            expect(Items.create).toHaveBeenCalled();
            expect(result.ItemId).toBe('new-item');
        });
    });

    describe('updateItem', () => {
        it('should return null if item not found', async () => {
            mockPermissions.add('update_items');
            Items.findOne.mockResolvedValue(null);

            const result = await ItemsService.updateItem('item-123', mockUser, mockPermissions, {});

            expect(result).toBeNull();
        });

        it('should update item fields', async () => {
            mockPermissions.add('update_items');
            Items.findOne.mockResolvedValue(mockItemInstance);

            const updates = { ItemName: 'Updated Name', CurrentPrice: 50 };

            const result = await ItemsService.updateItem('item-123', mockUser, mockPermissions, updates);

            expect(mockItemInstance.ItemName).toBe('Updated Name');
            expect(mockItemInstance.CurrentPrice).toBe(50);
            expect(mockItemInstance.save).toHaveBeenCalled();
        });
    });

    describe('deleteItem', () => {
        it('should return false if deletion fails', async () => {
            Items.destroy.mockResolvedValue(0);

            const result = await ItemsService.deleteItem('item-123', mockUser, mockPermissions);

            expect(result).toBe(false);
        });

        it('should return true if deletion successful', async () => {
            Items.destroy.mockResolvedValue(1);

            const result = await ItemsService.deleteItem('item-123', mockUser, mockPermissions);

            expect(result).toBe(true);
        });
    });
});
