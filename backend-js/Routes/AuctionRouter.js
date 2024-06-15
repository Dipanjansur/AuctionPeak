const express = require('express');
const { getAllAuctions, getAuctionById, createNewAuction, updateAuctionData, deleteAuction } = require('../Controller/AuctionController');
const isAuthticated = require('../middleware/isAuthticated');
// const { canView, canUpdate, canDelete } = require('../middleware/PermisssionManager');
const AuctionRouter = express.Router();
AuctionRouter.get('/', isAuthticated, getAllAuctions);
AuctionRouter.get('/:auctionId', isAuthticated, getAuctionById)
AuctionRouter.post('/', isAuthticated, createNewAuction)
AuctionRouter.patch('/:auctionId', isAuthticated, updateAuctionData)
AuctionRouter.delete('/:auctionId', isAuthticated, deleteAuction)
module.exports = AuctionRouter;