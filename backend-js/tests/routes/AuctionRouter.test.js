const request = require('supertest');
const express = require('express');
const AuctionRouter = require('../../src/Routes/AuctionRouter');
const AuctionController = require('../../src/Controller/AuctionController');
const isAuthticated = require('../../src/middleware/isAuthticated');
const RolePermInjector = require('../../src/middleware/RolePermInjector');

// Mock Middleware
jest.mock('../../src/middleware/isAuthticated', () => jest.fn((req, res, next) => next()));
jest.mock('../../src/middleware/RolePermInjector', () => jest.fn((req, res, next) => next()));

// Mock Controller
jest.mock('../../src/Controller/AuctionController', () => ({
    getAllAuctions: jest.fn((req, res) => res.status(200).send('getAllAuctions')),
    getAuctionById: jest.fn((req, res) => res.status(200).send('getAuctionById')),
    createNewAuction: jest.fn((req, res) => res.status(201).send('createNewAuction')),
    updateAuctionData: jest.fn((req, res) => res.status(200).send('updateAuctionData')),
    deleteAuction: jest.fn((req, res) => res.status(200).send('deleteAuction'))
}));

const app = express();
app.use(express.json());
app.use('/auctions', AuctionRouter);

describe('AuctionRouter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('GET /auctions should call getAllAuctions', async () => {
        const res = await request(app).get('/auctions');
        expect(res.status).toBe(200);
        expect(res.text).toBe('getAllAuctions');
        expect(AuctionController.getAllAuctions).toHaveBeenCalled();
        expect(isAuthticated).toHaveBeenCalled();
        expect(RolePermInjector).toHaveBeenCalled();
    });

    it('GET /auctions/:auctionId should call getAuctionById', async () => {
        const res = await request(app).get('/auctions/123');
        expect(res.status).toBe(200);
        expect(res.text).toBe('getAuctionById');
        expect(AuctionController.getAuctionById).toHaveBeenCalled();
    });

    it('POST /auctions should call createNewAuction', async () => {
        const res = await request(app).post('/auctions').send({});
        expect(res.status).toBe(201);
        expect(res.text).toBe('createNewAuction');
        expect(AuctionController.createNewAuction).toHaveBeenCalled();
    });

    it('PATCH /auctions/:auctionId should call updateAuctionData', async () => {
        const res = await request(app).patch('/auctions/123').send({});
        expect(res.status).toBe(200);
        expect(res.text).toBe('updateAuctionData');
        expect(AuctionController.updateAuctionData).toHaveBeenCalled();
    });

    it('DELETE /auctions/:auctionId should call deleteAuction', async () => {
        const res = await request(app).delete('/auctions/123');
        expect(res.status).toBe(200);
        expect(res.text).toBe('deleteAuction');
        expect(AuctionController.deleteAuction).toHaveBeenCalled();
    });
});
