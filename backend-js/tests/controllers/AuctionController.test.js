const AuctionController = require('../../src/Controller/AuctionController');
const AuctionService = require('../../src/services/AuctionServices');


jest.mock('../../src/services/AuctionServices');

describe('AuctionController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            user: { userId: 'user-1' },
            permissions: new Set(['view_auction'])
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    describe('getAllAuctions', () => {
        it('should return all auctions with status 200', async () => {
            const mockAuctions = [{ id: '1', name: 'Auction 1' }];
            AuctionService.getAllAuctions.mockResolvedValue(mockAuctions);

            await AuctionController.getAllAuctions(req, res);

            expect(AuctionService.getAllAuctions).toHaveBeenCalledWith(req.user, req.permissions);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAuctions);
        });
    });

    describe('getAuctionById', () => {
        it('should throw BadRequestError if auctionId is missing', async () => {
            // Simulate req.params.auctionId undefined
            await expect(AuctionController.getAuctionById(req, res))
                .rejects.toThrow("Auction ID is required");
        });

        it('should throw NotFoundError if auction not found', async () => {
            req.params.auctionId = 'invalid-id';
            AuctionService.getAuctionById.mockResolvedValue(null);

            await expect(AuctionController.getAuctionById(req, res))
                .rejects.toThrow("Auction not found or unauthorized");
        });

        it('should return auction if found', async () => {
            req.params.auctionId = 'valid-id';
            const mockAuction = { id: 'valid-id' };
            AuctionService.getAuctionById.mockResolvedValue(mockAuction);

            await AuctionController.getAuctionById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAuction);
        });
    });

    describe('createNewAuction', () => {
        it('should throw ValidationError if validation fails', async () => {
            req.body = {}; // Empty body should fail

            await expect(AuctionController.createNewAuction(req, res))
                .rejects.toThrow(); // ValidationError
        });

        it('should throw ForbiddenError if service throws authentication error', async () => {
            req.body = {
                name: 'New Auction',
                startTime: new Date(),
                duration: 50,
                auctionPic: ['http://example.com/pic.jpg'],
                AuctionDetails: 'Details'
            };
            AuctionService.createAuction.mockRejectedValue(new Error("Insufficient permissions to create an auction"));

            await expect(AuctionController.createNewAuction(req, res))
                .rejects.toThrow("Insufficient permissions to create an auction");
        });

        it('should create auction and return 201', async () => {
            req.body = {
                name: 'New Auction',
                startTime: new Date(),
                duration: 50,
                auctionPic: ['http://example.com/pic.jpg'],
                AuctionDetails: 'Details'
            };
            const mockAuction = { id: 'new-id', ...req.body };
            AuctionService.createAuction.mockResolvedValue(mockAuction);

            await AuctionController.createNewAuction(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockAuction);
        });
    });

    describe('updateAuctionData', () => {
        it('should throw BadRequestError if auctionId is missing', async () => {
            await expect(AuctionController.updateAuctionData(req, res))
                .rejects.toThrow("Auction ID is required");
        });

        it('should throw ValidationError if body invalid', async () => {
            req.params.auctionId = '1';
            req.body = { endTime: 'invalid-date' };

            await expect(AuctionController.updateAuctionData(req, res))
                .rejects.toThrow();
        });

        it('should throw BadRequestError if body empty', async () => {
            req.params.auctionId = '1';
            req.body = {};

            await expect(AuctionController.updateAuctionData(req, res))
                .rejects.toThrow("No update data provided");
        });

        it('should throw NotFoundError if update returns null', async () => {
            req.params.auctionId = '1';
            req.body = { name: 'Updated' };
            AuctionService.updateAuction.mockResolvedValue(null);

            await expect(AuctionController.updateAuctionData(req, res))
                .rejects.toThrow("Auction not found or unauthorized");
        });

        it('should return updated auction', async () => {
            req.params.auctionId = '1';
            req.body = { name: 'Updated' };
            AuctionService.updateAuction.mockResolvedValue({ id: '1', name: 'Updated' });

            await AuctionController.updateAuctionData(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Updated' });
        });
    });

    describe('deleteAuction', () => {
        it('should throw BadRequestError if auctionId is missing', async () => {
            await expect(AuctionController.deleteAuction(req, res))
                .rejects.toThrow("Auction ID is required");
        });

        it('should throw NotFoundError if delete fails', async () => {
            req.params.auctionId = '1';
            AuctionService.deleteAuction.mockResolvedValue(false);

            await expect(AuctionController.deleteAuction(req, res))
                .rejects.toThrow("Auction not found or unauthorized");
        });

        it('should return succes message if delete succeeds', async () => {
            req.params.auctionId = '1';
            AuctionService.deleteAuction.mockResolvedValue(true);

            await AuctionController.deleteAuction(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Auction deleted successfully" });
        });
    });
});
