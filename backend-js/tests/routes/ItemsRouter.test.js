const request = require('supertest');
const express = require('express');
const ItemsRouter = require('../../src/Routes/ItemsRouter');
const ItemsController = require('../../src/Controller/ItemsController');
const isAuthticated = require('../../src/middleware/isAuthticated');
const RolePermInjector = require('../../src/middleware/RolePermInjector');

// Mock Middleware
jest.mock('../../src/middleware/isAuthticated', () => jest.fn((req, res, next) => next()));
jest.mock('../../src/middleware/RolePermInjector', () => jest.fn((req, res, next) => next()));

// Mock Controller
jest.mock('../../src/Controller/ItemsController', () => ({
    getAllItems: jest.fn((req, res) => res.status(200).send('getAllItems')),
    getItemById: jest.fn((req, res) => res.status(200).send('getItemById')),
    createNewItem: jest.fn((req, res) => res.status(201).send('createNewItem')),
    updateItemData: jest.fn((req, res) => res.status(200).send('updateItemData')),
    deleteItem: jest.fn((req, res) => res.status(200).send('deleteItem')),
}));

const app = express();
app.use(express.json());
app.use('/items', ItemsRouter);

describe('ItemsRouter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('GET /items should call getAllItems', async () => {
        const res = await request(app).get('/items');
        expect(res.status).toBe(200);
        expect(res.text).toBe('getAllItems');
        expect(ItemsController.getAllItems).toHaveBeenCalled();
        expect(isAuthticated).toHaveBeenCalled();
        expect(RolePermInjector).toHaveBeenCalled();
    });

    it('GET /items/:ItemId should call getItemById', async () => {
        const res = await request(app).get('/items/123');
        expect(res.status).toBe(200);
        expect(res.text).toBe('getItemById');
        expect(ItemsController.getItemById).toHaveBeenCalled();
    });

    it('POST /items should call createNewItem', async () => {
        const res = await request(app).post('/items').send({});
        expect(res.status).toBe(201);
        expect(res.text).toBe('createNewItem');
        expect(ItemsController.createNewItem).toHaveBeenCalled();
    });

    it('PATCH /items/:ItemId should call updateItemData', async () => {
        const res = await request(app).patch('/items/123').send({});
        expect(res.status).toBe(200);
        expect(res.text).toBe('updateItemData');
        expect(ItemsController.updateItemData).toHaveBeenCalled();
    });

    it('DELETE /items/:ItemId should call deleteItem', async () => {
        const res = await request(app).delete('/items/123');
        expect(res.status).toBe(200);
        expect(res.text).toBe('deleteItem');
        expect(ItemsController.deleteItem).toHaveBeenCalled();
    });
});
