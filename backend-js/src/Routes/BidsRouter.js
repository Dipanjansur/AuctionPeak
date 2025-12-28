const express = require('express');
const { getAllBids, getBidsById, createNewBids, updateBids, deleteBids, bidsUpdate } = require('../Controller/BidsController');
const isAuthticated = require('../middleware/isAuthticated');
const RolePermInjector = require('../middleware/RolePermInjector');
const BidsRouter = express.Router();
BidsRouter.get('/', isAuthticated, RolePermInjector, getAllBids);
BidsRouter.get('/bidsupdate', isAuthticated, RolePermInjector, bidsUpdate)
BidsRouter.get('/:BidsId', isAuthticated, RolePermInjector, getBidsById)
BidsRouter.post('/', isAuthticated, RolePermInjector, createNewBids)
BidsRouter.patch('/:BidsId', isAuthticated, RolePermInjector, updateBids)
BidsRouter.delete('/:BidsId', isAuthticated, RolePermInjector, deleteBids)
module.exports = BidsRouter;