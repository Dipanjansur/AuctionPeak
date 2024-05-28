const express = require('express');
const { signInUser, loginUser, getUsersById, getAllUsers, updateProfileData, deleteUsers } = require('../Controller/UsersController');
const UsersRouter = express.Router();
UsersRouter.post('/signin', signInUser);
UsersRouter.post('/login', loginUser)
UsersRouter.get('/:userId', getUsersById)
UsersRouter.get('/', getAllUsers)
UsersRouter.patch('/:userId', updateProfileData)
UsersRouter.delete('/:userId', deleteUsers)
module.exports = UsersRouter;