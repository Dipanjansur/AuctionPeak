const express = require('express');
const { getAllBids, getBidsById, createNewBids, updateBids, deleteBids } = require('../Controller/BidsController');
const BidsRouter = express.Router();
BidsRouter.get('/', getAllBids);
BidsRouter.get('/:BidsId', getBidsById)
BidsRouter.post('/', createNewBids)
BidsRouter.patch('/:BidsId', updateBids)
BidsRouter.delete('/:BidsId', deleteBids)
module.exports = BidsRouter;