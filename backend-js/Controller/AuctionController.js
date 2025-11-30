const { v4: uuidv4 } = require('uuid');
const { Auction } = require("../models/Auctions");
const Logging = require("../utils/Logger");
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");
const { log } = require('winston');
const Items = require('../models/Items');
const { getItemByAuctionId } = require('./ItemsController');

// Define permissions constants
const PERMISSIONS = {
  ADMIN_ACCESS: 'all_auction',   
  VIEW_BASIC: 'view_auction',    
  CREATE: 'create_auction',      
  UPDATE_AUCTION: 'update_auction', 
  DELETE_AUCTION: 'delete_auction'
};  

/**
 * Helper: Determines the database 'where' clause for ACCESS/VISIBILITY.
 * Use this when fetching data.
 */
const getReadScope = (user, permissions) => {
  // if (permissions.has(PERMISSIONS.ADMIN_ACCESS) || permissions.has(PERMISSIONS.VIEW_BASIC)) {
  //   return {}; 
  // }
  // return { createdBy: user.usersId };
  return {}; // Currently allowing all auctions to be visible
};


const getWriteScope = (user, permissions, globalPermission) => {
  if (permissions.has(PERMISSIONS.ADMIN_ACCESS) || permissions.has(globalPermission)) {
    return {}; 
  }
  return { createdBy: user.usersId };
};

/**
 * Helper: Decorates an auction object with computed permissions for the frontend.
 * This implements the HATEOAS / "Smart UI" pattern.
 */
const attachItemPermissions = (auction, user, permissions) => {
  const isOwner = auction.createdBy === user.usersId;
  const auctionData = auction.toJSON ? auction.toJSON() : auction;
  return {
    ...auctionData,
permission: Array.from(new Set([
  ...(isOwner ? Object.values(PERMISSIONS) : []),
  permissions.has(PERMISSIONS.ADMIN_ACCESS) && 'all_auction',
  (permissions.has(PERMISSIONS.UPDATE_GLOBAL) || permissions.has(PERMISSIONS.UPDATE_AUCTION)) && 'update_auction',
  permissions.has(PERMISSIONS.DELETE_GLOBAL) && 'delete_auction'
].filter(Boolean)))
  };
};

const getAllAuctions = async (req, res) => {
  try {
    const { user,permissions} = req;
    const scope = getReadScope(user, permissions);
    
    Logging(Logging_level.info, Entity.Controller, Events.READ_OP, `Fetching auctions with scope: ${JSON.stringify(scope)}`, Models.Auction);

    const auctions = await Auction.findAll({ where: scope });

    if (!auctions || auctions.length === 0) {
      return res.status(200).json([]);
    }
    const responseData = auctions.map(auction => attachItemPermissions(auction, user, permissions));

    return res.status(200).json(responseData);

  } catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.READ_OP, `Error in getAllAuctions: ${err.message}`, Models.Auction);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAuctionById = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { user, permissions } = req;

    // 1. Determine Visibility
    const scope = getReadScope(user, permissions);
    const query = {
      where: {
        AuctionId: auctionId,
        ...scope
      },
    };

    let auction = await Auction.findOne(query);
    const auctionItems = await getItemByAuctionId(auctionId,user,permissions);
    auction.dataValues.items = auctionItems;
    console.log("Auction with items: ",auction);
    if (!auction) {
      Logging(Logging_level.warn, Entity.Controller, Events.READ_OP, `Auction not found or access denied: ${auctionId}`, Models.Auction);
      return res.status(404).json({ message: "Auction not found" });
    }

    // 2. Inject Permissions
    const responseData = attachItemPermissions(auction, user, permissions);
    Logging(Logging_level.info, Entity.Controller, Events.READ_OP, `Retrieved auction: ${auctionId}`, Models.Auction);
    return res.status(200).json(responseData);

  } catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.READ_OP, `Error in getAuctionById: ${err.message}`, Models.Auction);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewAuction = async (req, res) => {
  try {
    const { user, permissions } = req;
    const payload = req.body;

    // 1. Capability Check
    // Logic: To create, you MUST have the specific 'create_auction' capability.
    // Just "viewing" or "owning" isn't enough, because you don't own it yet.
    const canCreate = permissions.includes(PERMISSIONS.CREATE) || permissions.includes(PERMISSIONS.ADMIN_ACCESS);

    if (!canCreate) {
      Logging(Logging_level.warn, Entity.Controller, Events.CREATE_OP, `Unauthorized create attempt by user: ${user.userId}`, Models.Auction);
      return res.status(403).json({ message: "Insufficient permissions to create an auction" });
    }

    if (!payload.name || !payload.startTime || !payload.endTime) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newAuction = await Auction.create({
      AuctionId: uuidv4(),
      name: payload.name,
      AuctionDetails: payload.AuctionDetails,
      startTime: payload.startTime,
      endTime: payload.endTime,
      createdBy: user.userId
    });

    Logging(Logging_level.info, Entity.Controller, Events.CREATE_OP, `Created auction: ${newAuction.AuctionId}`, Models.Auction);
    return res.status(201).json(newAuction);

  } catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.CREATE_OP, `Error in createNewAuction: ${err.message}`, Models.Auction);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAuctionData = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const updates = req.body;
    const { user, permissions } = req;

    if (Object.keys(updates).length === 0) return res.status(400).json({ message: "No update data provided" });

    // 1. Security Enforcement: Global Permission OR Owner
    const scope = getWriteScope(user, permissions, PERMISSIONS.UPDATE_GLOBAL);
    
    const auctionToUpdate = await Auction.findOne({
      where: {
        AuctionId: auctionId,
        ...scope // This ensures only owners (or admins) find the record
      }
    });

    if (!auctionToUpdate) {
      return res.status(404).json({ message: "Auction not found or unauthorized" });
    }

    // 2. Apply Updates
    if (updates.name) auctionToUpdate.name = updates.name;
    if (updates.startTime) auctionToUpdate.startTime = updates.startTime;
    if (updates.endTime) auctionToUpdate.endTime = updates.endTime;
    if (updates.AuctionDetails) auctionToUpdate.AuctionDetails = updates.AuctionDetails;

    await auctionToUpdate.save();

    Logging(Logging_level.info, Entity.Controller, Events.UPDATE_OP, `Updated auction: ${auctionId}`, Models.Auction);
    
    // Return the object with updated permission meta (just in case logic changes)
    return res.status(200).json(attachItemPermissions(auctionToUpdate, user, permissions));

  } catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.UPDATE_OP, `Error in updateAuctionData: ${err.message}`, Models.Auction);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { user, permissions } = req;

    // 1. Security Enforcement
    const scope = getWriteScope(user, permissions, PERMISSIONS.DELETE_GLOBAL);

    const deletedCount = await Auction.destroy({
      where: {
        AuctionId: auctionId,
        ...scope
      }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Auction not found or unauthorized" });
    }

    Logging(Logging_level.info, Entity.Controller, Events.DELETE_OP, `Deleted auction: ${auctionId}`, Models.Auction);
    return res.status(200).json({ message: "Auction deleted successfully" });

  } catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.DELETE_OP, `Error in deleteAuction: ${err.message}`, Models.Auction);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllAuctions,
  getAuctionById,
  createNewAuction,
  updateAuctionData,
  deleteAuction
};