const Items = require("../models/Items");
const { AuctionItems } = require("../models/Auctions");
const Logging = require("../utils/Logger");
const { v4: uuidv4 } = require("uuid");
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");
const { Op } = require("sequelize");
const Bids = require("../models/Bids");

const PERMISSIONS = {
  ADMIN_ACCESS: "all_items",
  VIEW_BASIC: "view_items",
  CREATE: "create_items",
  UPDATE_GLOBAL: "update_items",
  DELETE_GLOBAL: "delete_items"
};


const getReadScope = (user, permissions) => {
  if (permissions.has(PERMISSIONS.ADMIN_ACCESS) || permissions.has(PERMISSIONS.VIEW_BASIC)) {
    return {};
  } else {
    // if the basic view premission is not there then exit with a 403 staus code
    throw new Error("Insufficient permission to view items");
  }

  //remove should be able to see all the items
  // return { Owner: user.usersId };
};


const getWriteScope = (user, permissions, globalPermission) => {
  if (permissions.has(PERMISSIONS.ADMIN_ACCESS) || permissions.has(globalPermission)) {
    return {};
  }
  return { Owner: user.usersId };
};

/**
 * Helper: Decorates an auction object with computed permissions for the frontend.
 * This implements the HATEOAS / "Smart UI" pattern.
 */
const attachItemPermissions = (auctionItems, user, permissions) => {
  const isOwner = auctionItems.Owner === user.usersId;
  const auctionData = auctionItems.toJSON ? auctionItems.toJSON() : auctionItems;
  return {
    ...auctionData,
    permission: Array.from(new Set([
      ...(isOwner ? Object.values(PERMISSIONS) : []),
      permissions.has(PERMISSIONS.ADMIN_ACCESS) && 'all_items',
      (permissions.has(PERMISSIONS.UPDATE_GLOBAL) || permissions.has(PERMISSIONS.UPDATE_AUCTION)) && 'update_items',
      permissions.has(PERMISSIONS.DELETE_GLOBAL) && 'delete_items'
    ].filter(Boolean)))
  };
};

const getAllItems = async (req, res) => {
  try {
    const { user, permissions } = req;

    const scope = getReadScope(user, permissions);

    let items = [];
    // TODO: check does this work??
    // If auction filter present
    if (req.query.auction) {
      const links = await AuctionItems.findAll({
        where: { auctionId: req.query.auction },
        attributes: ["itemItemId"]
      });

      if (links.length === 0) {
        return res.status(404).json({ message: "No items found for this auction" });
      }

      const itemIds = links.map(x => x.dataValues.itemItemId);

      items = await Items.findAll({
        where: {
          ItemId: { [Op.in]: itemIds },
          ...scope
        }
      });
    } else {
      items = await Items.findAll({ where: scope });
    }

    if (!items || items.length === 0) {
      return res.status(200).json([]);
    }

    const responseData = items.map(item =>
      attachItemPermissions(item, user, permissions)
    );

    Logging(
      Logging_level.info,
      Entity.Controller,
      Events.READ_OP,
      `Fetched items`,
      Models.Items
    );

    return res.status(200).json(responseData);
  } catch (err) {
    Logging(
      Logging_level.error,
      Entity.Controller,
      Events.READ_OP,
      `Error in getAllItems: ${err.message}`,
      Models.Items
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const getItemByAuctionId = async (auctionId, user, permissions) => {
  const auctionItems = await Items.findAll({ where: { auctionId: auctionId } });
  const responseData = auctionItems.map(item =>
    attachItemPermissions(item, user, permissions)
  );
  return responseData;
}

// GET ITEM BY ID
const getItemById = async (req, res) => {
  try {
    const { ItemId } = req.params;
    const { user, permissions } = req;

    const scope = getReadScope(user, permissions);

    const item = await Items.findOne({
      where: {
        ItemId,
        ...scope
      },
    });
    const itemBids=await Bids.findAll({
      where:{
        itemId:ItemId
      },
    });
    item.dataValues.bids=itemBids;
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const responseData = attachItemPermissions(item, user, permissions);
    
    return res.status(200).json(responseData);
  } catch (err) {
    Logging(
      Logging_level.error,
      Entity.Controller,
      Events.READ_OP,
      `Error in getItemById: ${err.message}`,
      Models.Items
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// CREATE ITEM
const createNewItem = async (req, res) => {
  try {
    const { user, permissions } = req;
    const payload = req.body;

    const canCreate =
      permissions.has(PERMISSIONS.CREATE) ||
      permissions.has(PERMISSIONS.ADMIN_ACCESS);

    if (!canCreate) {
      return res.status(403).json({ message: "Insufficient permission to create item" });
    }

    const newItem = await Items.create({
      ItemId: uuidv4(),
      ItemName: payload.ItemName,
      Bio: payload.Bio,
      Status: payload.Status,
      ItemDescription: payload.ItemDescription,
      CurrentPrice: payload.CurrentPrice,
      createdBy: user.userId
    });

    return res.status(201).json(newItem);
  } catch (err) {
    Logging(
      Logging_level.error,
      Entity.Controller,
      Events.CREATE_OP,
      `Error in createNewItem: ${err.message}`,
      Models.Items
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE ITEM
const updateItemData = async (req, res) => {
  try {
    const { ItemId } = req.params;
    const updates = req.body;
    const { user, permissions } = req;

    const scope = getWriteScope(user, permissions, PERMISSIONS.UPDATE_GLOBAL);

    const item = await Items.findOne({
      where: { ItemId, ...scope }
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found or unauthorized" });
    }

    if (updates.ItemName) item.ItemName = updates.ItemName;
    if (updates.Bio) item.Bio = updates.Bio;
    if (updates.ItemDescription) item.ItemDescription = updates.ItemDescription;
    if (updates.Status) item.Status = updates.Status;
    if (updates.CurrentPrice) item.CurrentPrice = updates.CurrentPrice;

    await item.save();

    return res.status(200).json(attachItemPermissions(item, user, permissions));
  } catch (err) {
    Logging(
      Logging_level.error,
      Entity.Controller,
      Events.UPDATE_OP,
      `Error in updateItemData: ${err.message}`,
      Models.Items
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE ITEM
const deleteItem = async (req, res) => {
  try {
    const { ItemId } = req.params;
    const { user, permissions } = req;

    const scope = getWriteScope(user, permissions, PERMISSIONS.DELETE_GLOBAL);

    const result = await Items.destroy({
      where: { ItemId, ...scope }
    });

    if (result === 0) {
      return res.status(404).json({ message: "Item not found or unauthorized" });
    }

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    Logging(
      Logging_level.error,
      Entity.Controller,
      Events.DELETE_OP,
      `Error in deleteItem: ${err.message}`,
      Models.Items
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createNewItem,
  updateItemData,
  deleteItem,
  getItemByAuctionId
};
