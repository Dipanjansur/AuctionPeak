const express = require('express');
const { signInUser, loginUser, getUsersById, getAllUsers, updateProfileData, deleteUsers } = require('../Controller/UsersController');
const isAuthticated = require('../middleware/isAuthticated');
const UsersRouter = express.Router();
UsersRouter.post('/signin', signInUser);
UsersRouter.post('/login', loginUser)
UsersRouter.get('/:userId', isAuthticated, getUsersById)
UsersRouter.get('/', isAuthticated, getAllUsers)
UsersRouter.patch('/:userId', isAuthticated, updateProfileData)
UsersRouter.delete('/:userId', isAuthticated, deleteUsers)
module.exports = UsersRouter;