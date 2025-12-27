const request = require('supertest');
const express = require('express');
const BidsRouter = require('../../src/Routes/BidsRouter');
const BidsController = require('../../src/Controller/BidsController');
const isAuthticated = require('../../src/middleware/isAuthticated');
const RolePermInjector = require('../../src/middleware/RolePermInjector');

// Mock Middleware
jest.mock('../../src/middleware/isAuthticated', () => jest.fn((req, res, next) => next()));
jest.mock('../../src/middleware/RolePermInjector', () => jest.fn((req, res, next) => next()));

// Mock Controller
jest.mock('../../src/Controller/BidsController', () => ({
    getAllBids: jest.fn((req, res) => res.status(200).send('getAllBids')),
    getBidsById: jest.fn((req, res) => res.status(200).send('getBidsById')),
    createNewBids: jest.fn((req, res) => res.status(201).send('createNewBids')),
    updateBids: jest.fn((req, res) => res.status(200).send('updateBids')),
    deleteBids: jest.fn((req, res) => res.status(200).send('deleteBids'))
}));

const app = express();
app.use(express.json());
app.use('/bids', BidsRouter);

describe('BidsRouter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('GET /bids should call getAllBids', async () => {
        const res = await request(app).get('/bids');
        expect(res.status).toBe(200);
        expect(res.text).toBe('getAllBids');
        expect(BidsController.getAllBids).toHaveBeenCalled();
        expect(isAuthticated).toHaveBeenCalled();
        expect(RolePermInjector).toHaveBeenCalled();
    });

    it('GET /bids/:BidsId should call getBidsById', async () => {
        const res = await request(app).get('/bids/123');
        expect(res.status).toBe(200);
        expect(res.text).toBe('getBidsById');
        expect(BidsController.getBidsById).toHaveBeenCalled();
    });

    it('POST /bids should call createNewBids', async () => {
        const res = await request(app).post('/bids').send({});
        expect(res.status).toBe(201);
        expect(res.text).toBe('createNewBids');
        expect(BidsController.createNewBids).toHaveBeenCalled();
    });

    it('PATCH /bids/:BidsId should call updateBids', async () => {
        const res = await request(app).patch('/bids/123').send({});
        expect(res.status).toBe(200);
        expect(res.text).toBe('updateBids');
        expect(BidsController.updateBids).toHaveBeenCalled();
    });

    it('DELETE /bids/:BidsId should call deleteBids', async () => {
        const res = await request(app).delete('/bids/123');
        expect(res.status).toBe(200);
        expect(res.text).toBe('deleteBids');
        expect(BidsController.deleteBids).toHaveBeenCalled();
    });
});
