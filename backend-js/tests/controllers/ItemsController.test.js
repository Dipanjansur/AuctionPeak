const ItemsController = require('../../src/Controller/ItemsController');
const ItemsService = require('../../src/services/ItemsService');

// Mock models to prevent circular dependency issues during load if mock fails to intercept immediately
jest.mock('../../src/models/Items', () => ({}));
jest.mock('../../src/models/Users', () => ({}));
jest.mock('../../src/models/Auctions', () => ({}));
jest.mock('../../src/models/Bids', () => ({}));

jest.mock('../../src/services/ItemsService', () => ({
    getAllItems: jest.fn(),
    getItemById: jest.fn(),
    createNewItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn(),
    getItemByAuctionId: jest.fn()
}));

describe('ItemsController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            query: { auction: '1' },
            user: { userId: '1' },
            permissions: new Set()
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('getAllItems', () => {
        it('should throw ForbiddenError if service throws permission error', async () => {
            ItemsService.getAllItems.mockRejectedValue(new Error("Insufficient permission to view items"));

            await expect(ItemsController.getAllItems(req, res))
                .rejects.toThrow("Insufficient permission to view items");
        });

        it('should throw NotFoundError if service returns null', async () => {
            ItemsService.getAllItems.mockResolvedValue(null);

            await expect(ItemsController.getAllItems(req, res))
                .rejects.toThrow("No items found for this auction");
        });

        it('should return items', async () => {
            const mockItems = { items: [] };
            ItemsService.getAllItems.mockResolvedValue(mockItems);

            await ItemsController.getAllItems(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockItems);
        });
    });

    describe('getItemById', () => {
        it('should throw BadRequestError if ItemId missing', async () => {
            await expect(ItemsController.getItemById(req, res))
                .rejects.toThrow("Item ID is required");
        });

        it('should throw NotFoundError if item not found', async () => {
            req.params.ItemId = '1';
            ItemsService.getItemById.mockResolvedValue(null);

            await expect(ItemsController.getItemById(req, res))
                .rejects.toThrow("Item not found");
        });

        it('should return item', async () => {
            req.params.ItemId = '1';
            ItemsService.getItemById.mockResolvedValue({ id: '1' });

            await ItemsController.getItemById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: '1' });
        });
    });

    describe('createNewItem', () => {
        it('should throw ValidationError if validation fails', async () => {
            req.body = {};

            await expect(ItemsController.createNewItem(req, res))
                .rejects.toThrow();
        });

        it('should throw ForbiddenError if permission denied', async () => {
            req.body = {
                ItemName: 'Name', Bio: 'Bio', Status: 'open',
                ItemDescription: 'Desc', CurrentPrice: 10
            };
            ItemsService.createNewItem.mockRejectedValue(new Error("Insufficient permission to create item"));

            await expect(ItemsController.createNewItem(req, res))
                .rejects.toThrow("Insufficient permission to create item");
        });

        it('should create item and return 201', async () => {
            req.body = {
                ItemName: 'Name', Bio: 'Bio', Status: 'open',
                ItemDescription: 'Desc', CurrentPrice: 10
            };
            ItemsService.createNewItem.mockResolvedValue({ id: '1' });

            await ItemsController.createNewItem(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: '1' });
        });
    });

    describe('updateItemData', () => {
        it('should throw BadRequestError if ItemId missing', async () => {
            await expect(ItemsController.updateItemData(req, res))
                .rejects.toThrow("Item ID is required");
        });

        it('should throw ValidationError if validation fails', async () => {
            req.params.ItemId = '1';
            req.body = { CurrentPrice: -10 };

            await expect(ItemsController.updateItemData(req, res))
                .rejects.toThrow();
        });

        it('should throw NotFoundError if update fails', async () => {
            req.params.ItemId = '1';
            req.body = { ItemName: 'New' };
            ItemsService.updateItem.mockResolvedValue(null);

            await expect(ItemsController.updateItemData(req, res))
                .rejects.toThrow("Item not found or unauthorized");
        });

        it('should return updated item', async () => {
            req.params.ItemId = '1';
            req.body = { ItemName: 'New' };
            ItemsService.updateItem.mockResolvedValue({ id: '1' });

            await ItemsController.updateItemData(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: '1' });
        });
    });

    describe('deleteItem', () => {
        it('should throw BadRequestError if ItemId missing', async () => {
            await expect(ItemsController.deleteItem(req, res))
                .rejects.toThrow("Item ID is required");
        });

        it('should throw NotFoundError if delete fails', async () => {
            req.params.ItemId = '1';
            ItemsService.deleteItem.mockResolvedValue(false);

            await expect(ItemsController.deleteItem(req, res))
                .rejects.toThrow("Item not found or unauthorized");
        });

        it('should return success message', async () => {
            req.params.ItemId = '1';
            ItemsService.deleteItem.mockResolvedValue(true);

            await ItemsController.deleteItem(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Item deleted successfully" });
        });
    });

    // Test the pass through functionality
    describe('getItemByAuctionId', () => {
        it('should call service', async () => {
            ItemsService.getItemByAuctionId.mockResolvedValue([]);

            await ItemsController.getItemByAuctionId('1', req.user, req.permissions);

            expect(ItemsService.getItemByAuctionId).toHaveBeenCalledWith('1', req.user, req.permissions);
        });
    });
});
