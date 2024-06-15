const express = require('express');
const { getAllBids, getBidsById, createNewBids, updateBids, deleteBids } = require('../Controller/BidsController');
const isAuthticated = require('../middleware/isAuthticated');
// const { canView, canUpdate, canDelete } = require('../middleware/PermisssionManager');
const BidsRouter = express.Router();
BidsRouter.get('/', isAuthticated, getAllBids);
BidsRouter.get('/:BidsId', isAuthticated, getBidsById)
BidsRouter.post('/', isAuthticated, createNewBids)
BidsRouter.patch('/:BidsId', isAuthticated, updateBids)
BidsRouter.delete('/:BidsId', isAuthticated, deleteBids)
module.exports = BidsRouter;