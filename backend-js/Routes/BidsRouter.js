const express = require('express');
const { getAllBids, getBidsById, createNewBids, updateBids, deleteBids } = require('../Controller/BidsController');
const isAuthticated = require('../middleware/isAuthticated');
// const { canView, canUpdate, canDelete } = require('../middleware/PermisssionManager');
const BidsRouter = express.Router();
BidsRouter.get('/', getAllBids);
BidsRouter.get('/:BidsId', getBidsById)
BidsRouter.post('/', createNewBids)
BidsRouter.patch('/:BidsId', updateBids)
BidsRouter.delete('/:BidsId', deleteBids)
module.exports = BidsRouter;