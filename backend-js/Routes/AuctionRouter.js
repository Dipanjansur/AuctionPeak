const express = require('express');
const { getAllAuctions, getAuctionById, createNewAuction, updateAuctionData, deleteAuction } = require('../Controller/AuctionController');
const isAuthticated = require('../middleware/isAuthticated');
const injectRoleAndPermissionMiddleware=require("../middleware/RolePermInjector")
const AuctionRouter = express.Router();
AuctionRouter.get('/',isAuthticated,injectRoleAndPermissionMiddleware, getAllAuctions);
AuctionRouter.get('/:auctionId', getAuctionById)
AuctionRouter.post('/', createNewAuction)
AuctionRouter.patch('/:auctionId', updateAuctionData)
AuctionRouter.delete('/:auctionId', deleteAuction)
module.exports = AuctionRouter;