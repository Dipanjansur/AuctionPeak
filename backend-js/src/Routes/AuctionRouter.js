const express = require('express');
const { getAllAuctions, getAuctionById, createNewAuction, updateAuctionData, deleteAuction } = require('../Controller/AuctionController');
const isAuthticated = require('../middleware/isAuthticated');
const RolePermInjector = require('../middleware/RolePermInjector');
const AuctionRouter = express.Router();
AuctionRouter.get('/',isAuthticated,RolePermInjector, getAllAuctions);
AuctionRouter.get('/:auctionId',isAuthticated,RolePermInjector, getAuctionById)
AuctionRouter.post('/',isAuthticated,RolePermInjector, createNewAuction)
AuctionRouter.patch('/:auctionId',isAuthticated,RolePermInjector, updateAuctionData)
AuctionRouter.delete('/:auctionId',isAuthticated,RolePermInjector, deleteAuction)
module.exports = AuctionRouter;