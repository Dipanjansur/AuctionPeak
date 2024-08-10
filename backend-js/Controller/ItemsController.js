const Items = require("../models/Items");
const { AuctionItems } = require("../models/Auctions");
const Logging = require("../utils/Logger");
const { v4: uuidv4 } = require('uuid');
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");
const { Op } = require('sequelize');
const getAllItems = async (req, res) => {
  try {
    if (req.query.auction) {
      retrievedItemId = await AuctionItems.findAll({
        where: {
          auctionId: req.query.auction,
        }, attributes: ['itemItemId']
      });
      if (retrievedItemId.length === 0) {
        return res.status(404).send('No items found for this auction');
      }
      retval = []
      retrievedItemId.forEach(element => {
        retval.push(element.dataValues.itemItemId)
      });
      // retrievedItemId[0].dataValues.itemItemId)
      const ItemsDetails = await Items.findAll({
        where: {
          ItemId: {
            [Op.in]: retval
          }
        }
      });
      return res.status(200).json({ message: ItemsDetails })
    }
    const retrievedItem = await Items.findAll();
    if (retrievedItem == null) {
      Logging(Logging_level.warn, Entity.Controller, Events.READ_OP, Models.Items, "no entity found getAllItems")
      return res.status(400).json({ message: "no entity found" })
    }
    Logging(Logging_level.info, Entity.Controller, Events.READ_OP, Models.Items, ` got data getAllItems${retrievedItem}`)
    return res.status(200).json({ message: retrievedItem })
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.READ_OP, Models.Items, `something went wrong in getAllItems${err} `)
    return res.status(500).json({ message: "something went wrong" })
  }
}

const getItemById = async (req, res) => {
  const { ItemId } = req.params;
  try {
    const retrievedItem = await Bids.findOne({
      where: {
        ItemId: ItemId,
      },
    });
    if (retrievedItem == null) {
      Logging(Logging_level.warn, Entity.Controller, Events.READ_OP, Models.Items, "no entity found getItemById")
      return res.status(400).json({ message: "no entity found" })
    }
    Logging(Logging_level.info, Entity.Controller, Events.READ_OP, Models.Items, ` got data getItemById${retrievedItem} `)
    return res.status(200).json({ message: retrievedItem });
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.READ_OP, Models.Items, `something went wrong in getItemById${err} `)
    return res.status(500).json({ message: "something went wrong" })
  }
}


const createNewItem = async (req, res) => {
  const newItem = req.body
  try {
    const createdItems = await Items.create({ ItemId: uuidv4(), ItemName: newItem.ItemName, Bio: newItem.Bio, Status: newItem.Status, ItemDescription: newItem.ItemDescription, CurrentPrice: newItem.CurrentPrice });
    Logging(Logging_level.info, Entity.Controller, Events.CREATE_OP, Models.Items, `created a new Auction with id ${createdItems.ItemId} createNewBids`)
    return res.status(201).json({ message: `New Item Created, ${createdItems.ItemId} ` });
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.CREATE_OP, Models.Items, `something unexpected createNewBids" + ${err}`)
    res.status(500).json({ message: "Something Went Wrong" });
  }
}

const updateItemData = async (req, res) => {
  const { ItemId } = req.params;
  const updatedItem = req.body;
  try {
    const RetrivedItem = await Items.findOne({
      where: {
        ItemId: ItemId,
      },
    });
    if (RetrivedItem == null) {
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, Models.Items, "no entity found updateItemData")
      return res.status(400).json({ message: "no entity found with that Id" })
    }
    if ((updatedItem.CurrentPrice == null) || (RetrivedItem.CurrentPrice == updatedItem.CurrentPrice)) {
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, Models.Items, `please check the request parameters updateItemData.Not a valid request ${req}`)
      return res.status(404).json({ message: "please check the request parameters.Not a valid request" })
    }
    (updatedItem.ItemName != null) && (RetrivedItem.ItemName = updatedItem.ItemName);
    (updatedItem.startTime != null) && (RetrivedItem.startTime = updatedItem.startTime);
    (updatedItem.endTime != null) && (RetrivedItem.endTime = updatedItem.endTime);
    await RetrivedItem.save()
    Logging(Logging_level.info, Entity.Controller, Events.UPDATE_OP, Models.Items, `updated successfully updateItemData`)
    return res.status(200).json({ message: RetrivedItem });
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.UPDATE_OP, Models.Items, `something unexpected updateItemData ${err}`)
    res.status(500).json({ message: "Something Went Wrong" });
  }
}

const deleteItem = async (req, res) => {
  const { ItemId } = req.params;
  try {
    const RetrivedItem = await Auction.destroy({
      where: {
        ItemId: ItemId,
      },
    });
    if (RetrivedItem == 1) {
      Logging(Logging_level.info, Entity.Controller, Events.UPDATE_OP, Models.Items, `deleted successfully deleteItem`)
      return res.status(200).json({ message: "sucessfully deleted" });
    } else {
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, Models.Items, "no entity found or already deleted deleteItem")
      return res.status(200).json({ message: RetrivedItem });
    }
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.UPDATE_OP, Models.Items, `something unexpected deleteItem ${err}`)
    res.status(500).json({ message: "Something Went Wrong" });
  }
}
module.exports = {
  getAllItems, getItemById, createNewItem, updateItemData, deleteItem
}