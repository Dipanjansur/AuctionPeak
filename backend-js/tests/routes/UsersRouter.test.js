const request = require('supertest');
const express = require('express');
const UsersRouter = require('../../src/Routes/UsersRouter');
const UsersController = require('../../src/Controller/UsersController');
const isAuthticated = require('../../src/middleware/isAuthticated');
const RolePermInjector = require('../../src/middleware/RolePermInjector');

// Mock Middleware
jest.mock('../../src/middleware/isAuthticated', () => jest.fn((req, res, next) => next()));
jest.mock('../../src/middleware/RolePermInjector', () => jest.fn((req, res, next) => next()));

// Mock Controller
jest.mock('../../src/Controller/UsersController', () => ({
    signInUser: jest.fn((req, res) => res.status(201).send('signInUser')),
    loginUser: jest.fn((req, res) => res.status(200).send('loginUser')),
    getAllUsers: jest.fn((req, res) => res.status(200).send('getAllUsers')),
    getUsersById: jest.fn((req, res) => res.status(200).send('getUsersById')),
    updateProfileData: jest.fn((req, res) => res.status(200).send('updateProfileData')),
    deleteUsers: jest.fn((req, res) => res.status(200).send('deleteUsers')),
}));

const app = express();
app.use(express.json());
app.use('/users', UsersRouter);

describe('UsersRouter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('POST /users/signin should call signInUser', async () => {
        const res = await request(app).post('/users/signin');
        expect(res.status).toBe(201);
        expect(res.text).toBe('signInUser');
        expect(UsersController.signInUser).toHaveBeenCalled();
    });

    it('POST /users/login should call loginUser', async () => {
        const res = await request(app).post('/users/login');
        expect(res.status).toBe(200);
        expect(res.text).toBe('loginUser');
        expect(UsersController.loginUser).toHaveBeenCalled();
    });

    it('GET /users should call getAllUsers', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toBe(200);
        expect(res.text).toBe('getAllUsers');
        expect(UsersController.getAllUsers).toHaveBeenCalled();
    });

    it('GET /users/:userId should call getUsersById', async () => {
        const res = await request(app).get('/users/123');
        expect(res.status).toBe(200);
        expect(res.text).toBe('getUsersById');
        expect(UsersController.getUsersById).toHaveBeenCalled();
    });

    it('PATCH /users/:userId should call updateProfileData', async () => {
        const res = await request(app).patch('/users/123');
        expect(res.status).toBe(200);
        expect(res.text).toBe('updateProfileData');
        expect(UsersController.updateProfileData).toHaveBeenCalled();
    });

    it('DELETE /users/:userId should call deleteUsers', async () => {
        const res = await request(app).delete('/users/123');
        expect(res.status).toBe(200);
        expect(res.text).toBe('deleteUsers');
        expect(UsersController.deleteUsers).toHaveBeenCalled();
    });
});
