const request = require('supertest');
const express = require('express');
const StaticRouter = require('../../src/Routes/StaticRouter');
const StaticPageController = require('../../src/Controller/StaticPageController');

// Mock Controller
jest.mock('../../src/Controller/StaticPageController', () => ({
    aboutUsData: jest.fn((req, res) => res.status(200).send('aboutUsData')),
    goalsData: jest.fn((req, res) => res.status(200).send('goalsData')),
    pricingData: jest.fn((req, res) => res.status(200).send('pricingData')),
    membersData: jest.fn((req, res) => res.status(200).send('membersData'))
}));

const app = express();
app.use(express.json());
app.use('/static', StaticRouter);

describe('StaticRouter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('GET /static/aboutus should call aboutUsData', async () => {
        const res = await request(app).get('/static/aboutus');
        expect(res.status).toBe(200);
        expect(res.text).toBe('aboutUsData');
        expect(StaticPageController.aboutUsData).toHaveBeenCalled();
    });

    it('GET /static/goals should call goalsData', async () => {
        const res = await request(app).get('/static/goals');
        expect(res.status).toBe(200);
        expect(res.text).toBe('goalsData');
        expect(StaticPageController.goalsData).toHaveBeenCalled();
    });

    it('GET /static/pricing should call pricingData', async () => {
        const res = await request(app).get('/static/pricing');
        expect(res.status).toBe(200);
        expect(res.text).toBe('pricingData');
        expect(StaticPageController.pricingData).toHaveBeenCalled();
    });

    it('GET /static/members should call membersData', async () => {
        const res = await request(app).get('/static/members');
        expect(res.status).toBe(200);
        expect(res.text).toBe('membersData');
        expect(StaticPageController.membersData).toHaveBeenCalled();
    });
});
