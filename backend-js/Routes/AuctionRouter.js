const express = require('express');
const { getAllAuctions, getAuctionById, createNewAuction, updateAuctionData, deleteAuction } = require('../Controller/AuctionController');
const AuctionRouter = express.Router();
AuctionRouter.get('/', getAllAuctions);
AuctionRouter.get('/:auctionId', getAuctionById)
AuctionRouter.post('/', createNewAuction)
AuctionRouter.patch('/:auctionId', updateAuctionData)
AuctionRouter.delete('/:auctionId', deleteAuction)
module.exports = AuctionRouter;