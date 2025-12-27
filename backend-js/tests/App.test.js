const request = require('supertest');

// Mock Sequelize Instance
jest.mock('../src/models/index', () => ({
    authenticate: jest.fn(),
    sync: jest.fn(),
    define: jest.fn(() => ({
        belongsTo: jest.fn(),
        hasMany: jest.fn(),
        belongsToMany: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn()
    }))
}));

// Mock Models
jest.mock('../src/models/Users', () => ({}));
jest.mock('../src/models/Items', () => ({}));
jest.mock('../src/models/Bids', () => ({}));
jest.mock('../src/models/Auctions', () => ({ Auction: {}, AuctionParticipants: {} }));
jest.mock('../src/models/Roles', () => ({}));
jest.mock('../src/models/Permissions', () => ({}));

// Mock Routers to avoid loading them and their dependencies
const mockRouter = (req, res, next) => next();
jest.mock('../src/Routes/AuctionRouter', () => mockRouter);
jest.mock('../src/Routes/UsersRouter', () => mockRouter);
jest.mock('../src/Routes/ItemsRouter', () => mockRouter);
jest.mock('../src/Routes/StaticRouter', () => mockRouter);
jest.mock('../src/Routes/BidsRouter', () => mockRouter);

// Mock Logger
jest.mock('../src/utils/Logger', () => jest.fn());

const app = require('../src/App');

describe('App', () => {
    it('GET /health-check should return 200', async () => {
        const res = await request(app).get('/health-check');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Server is healty');
    });

    it('should have cors enabled (checked via headers)', async () => {
        const res = await request(app).get('/health-check');
        expect(res.headers['access-control-allow-origin']).toBe('http://127.0.0.1:5173');
    });

    it('should handle undefined routes (404 via default express behavior unless handled)', async () => {
        const res = await request(app).get('/undefined-route');
        expect(res.status).toBe(404);
    });
});
