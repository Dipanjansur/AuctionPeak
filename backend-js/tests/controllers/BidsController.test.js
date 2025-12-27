const BidsController = require('../../src/Controller/BidsController');
const BidsService = require('../../src/services/BidsService');

jest.mock('../../src/services/BidsService');

describe('BidsController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            user: { userId: '1' },
            permissions: new Set()
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('getAllBids', () => {
        it('should return all bids', async () => {
            const mockBids = [{ id: '1' }];
            BidsService.getAllBids.mockResolvedValue(mockBids);

            await BidsController.getAllBids(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockBids);
        });
    });

    describe('getBidsById', () => {
        it('should throw BadRequestError if BidsId missing', async () => {
            await expect(BidsController.getBidsById(req, res))
                .rejects.toThrow("Bid ID is required");
        });

        it('should throw NotFoundError if bid not found', async () => {
            req.params.BidsId = '1';
            BidsService.getBidsById.mockResolvedValue(null);

            await expect(BidsController.getBidsById(req, res))
                .rejects.toThrow("Bid not found or access denied");
        });

        it('should return bid', async () => {
            req.params.BidsId = '1';
            BidsService.getBidsById.mockResolvedValue({ id: '1' });

            await BidsController.getBidsById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: '1' });
        });
    });

    describe('createNewBids', () => {
        it('should throw ValidationError if validation fails', async () => {
            req.body = {};
            await expect(BidsController.createNewBids(req, res))
                .rejects.toThrow();
        });

        it('should throw ForbiddenError if service throws permission error', async () => {
            req.body = { amount: 100, ItemId: '1' };
            BidsService.createNewBid.mockRejectedValue(new Error("Insufficient permissions to create bid"));

            await expect(BidsController.createNewBids(req, res))
                .rejects.toThrow("Insufficient permissions to create bid");
        });

        it('should throw NotFoundError if item not found', async () => {
            req.body = { amount: 100, ItemId: '1' };
            BidsService.createNewBid.mockRejectedValue(new Error("Item not found"));

            await expect(BidsController.createNewBids(req, res))
                .rejects.toThrow("Item not found");
        });

        it('should create bid and return 201', async () => {
            req.body = { amount: 100, ItemId: '1' };
            BidsService.createNewBid.mockResolvedValue({ id: '1' });

            await BidsController.createNewBids(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: '1' });
        });
    });

    describe('updateBids', () => {
        it('should throw BadRequestError if BidsId missing', async () => {
            await expect(BidsController.updateBids(req, res))
                .rejects.toThrow("Bid ID is required");
        });

        it('should throw ValidationError if validation fails', async () => {
            req.params.BidsId = '1';
            req.body = { amount: -1 };
            await expect(BidsController.updateBids(req, res))
                .rejects.toThrow();
        });

        it('should throw NotFoundError if update fails', async () => {
            req.params.BidsId = '1';
            req.body = { amount: 100 };
            BidsService.updateBid.mockResolvedValue(null);

            await expect(BidsController.updateBids(req, res))
                .rejects.toThrow("Bid not found or unauthorized");
        });

        it('should return updated bid', async () => {
            req.params.BidsId = '1';
            req.body = { amount: 100 };
            BidsService.updateBid.mockResolvedValue({ id: '1' });

            await BidsController.updateBids(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: '1' });
        });
    });

    describe('deleteBids', () => {
        it('should throw BadRequestError if BidsId missing', async () => {
            await expect(BidsController.deleteBids(req, res))
                .rejects.toThrow("Bid ID is required");
        });

        it('should throw NotFoundError if delete fails', async () => {
            req.params.BidsId = '1';
            req.body = { amount: 100 };
            BidsService.deleteBid.mockResolvedValue(false);

            await expect(BidsController.deleteBids(req, res))
                .rejects.toThrow("Bid not found or unauthorized");
        });

        it('should return success message', async () => {
            req.params.BidsId = '1';
            req.body = { amount: 100 };
            BidsService.deleteBid.mockResolvedValue(true);

            await BidsController.deleteBids(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Bid deleted successfully" });
        });
    });
});
