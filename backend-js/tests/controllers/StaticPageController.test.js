const StaticPageController = require('../../src/Controller/StaticPageController');

describe('StaticPageController', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('aboutUsData should return 200 with data', () => {
        StaticPageController.aboutUsData(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Fetching About Us data"
        }));
    });

    it('goalsData should return 200 with data', () => {
        StaticPageController.goalsData(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Fetching our goals"
        }));
    });

    it('pricingData should return 200 with data', () => {
        StaticPageController.pricingData(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Fetching pricing details"
        }));
    });

    it('membersData should return 200 with data', () => {
        StaticPageController.membersData(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "Fetching team members data"
        }));
    });
});
