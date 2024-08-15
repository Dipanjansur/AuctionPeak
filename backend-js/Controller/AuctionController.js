const { Auction, AuctionParticipants } = require("../models/Auctions");
const { v4: uuidv4 } = require('uuid');
const Logging = require("../utils/Logger");
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");
const { isPrimitive } = require("sequelize/lib/utils");
const Items = require("../models/Items");
const getAllAuctions = async (req, res) => {
  try {
    const retrievedAuction = await Auction.findAll({});
    if (retrievedAuction != null && retrievedAuction.length === 0) {
      Logging(Logging_level.warn, Entity.Controller, Events.READ_OP, "no entity found getAllAuctions", Models.Auction)
      return res.status(400).json({ message: "no entity found" })
    }
    Logging(Logging_level.info, Entity.Controller, Events.READ_OP, ` got data getAllAuctions${retrievedAuction}`, Models.Auction)
    return res.status(200).json(retrievedAuction)
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.READ_OP, `something went wrong in getAllAuctions${err}`, Models.Auction)
    return res.status(500).json({ message: "something went wrong" })
  }
}

const getAuctionById = async (req, res) => {
  const { auctionId } = req.params
  try {
    const retrievedAuction = await Auction.findOne({
      where: {
        AuctionId: auctionId,
      }
    });
    const auctionedItems = await Items.findAll({
      where: { auctionId: auctionId },
      // include: [{
      //   model: Items,
      //   as: 'items',
      //   through: { attributes: [] } // This will exclude the join table attributes
      // }]
    });
    if (retrievedAuction == null) {
      Logging(Logging_level.warn, Entity.Controller, Events.READ_OP, "no entity found getAuctionById", Models.Auction)
      return res.status(400).json({ message: "no entity found" })
    }
    Logging(Logging_level.info, Entity.Controller, Events.READ_OP, ` got data getAuctionById${retrievedAuction}`, Models.Auction)
    return res.status(200).json({ "message": { "AuctionDetail": retrievedAuction, "items": auctionedItems } });
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.READ_OP, `something went wrong in getAuctionById${err}`, Models.Auction)
    return res.status(500).json({ message: "something went wrong" })
  }
}

const createNewAuction = async (req, res) => {
  const newAuction = req.body
  try {
    const createdAuction = await Auction.create({ AuctionId: uuidv4(), name: newAuction.name, AuctionDetails: newAuction.AuctionDetails, startTime: newAuction.startTime, endTime: newAuction.endTime });
    Logging(Logging_level.info, Entity.Controller, Events.CREATE_OP, `created a new Auction with id ${createdAuction.AuctionId} getAuctionById`, Models.Auction)
    return res.status(200).json({ message: `Creating a new auction with Id, ${createdAuction.AuctionId}` }, Models.Auction);
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.CREATE_OP, `something unexpected" + ${err}`, Models.Auction)
    res.status(500).json({ message: "Something Went Wrong" });
  }
}

const updateAuctionData = async (req, res) => {
  const { auctionId } = req.params
  const auction = req.body
  console.log(auction)
  try {
    const Retrivedauction = await Auction.findOne({
      where: {
        AuctionId: auctionId,
      },
    });
    if (Retrivedauction == null) {
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, "no entity found updateAuctionData", Models.Auction)
      return res.status(400).json({ message: "no entity found with that Id" })
    }
    if ((auction.name == auction.startTime == auction.endTime == null) || ((Retrivedauction.name == auction.name && Retrivedauction.startTime == auction.startTime) && Retrivedauction.endTime == auction.endTime)) {
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, `please check the request parameters updateAuctionData.Not a valid request ${req}`, Models.Auction)
      return res.status(404).json({ message: "please check the request parameters.Not a valid request" }, Models.Auction)
    }
    (auction.name != null) && (Retrivedauction.name = auction.name);
    (auction.startTime != null) && (Retrivedauction.startTime = auction.startTime);
    (auction.endTime != null) && (Retrivedauction.endTime = auction.endTime);
    await Retrivedauction.save();
    Logging(Logging_level.info, Entity.Controller, Events.UPDATE_OP, `updated successfully updateAuctionData`, Models.Auction)
    return res.status(200).json({ message: Retrivedauction });
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.UPDATE_OP, `something unexpected updateAuctionData ${err}`, Models.Auction)
    console.log("something unexpected" + err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
}

const deleteAuction = async (req, res) => {
  const { auctionId } = req.params
  try {
    const Retrivedauction = await Auction.destroy({
      where: {
        AuctionId: auctionId,
      },
    });
    if (Retrivedauction == 1) {
      Logging(Logging_level.info, Entity.Controller, Events.UPDATE_OP, `deleted successfully deleteAuction`, Models.Auction)
      return res.status(200).json({ message: "sucessfultty deleted" });
    } else {
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, "no entity found or already deleted deleteAuction", Models.Auction)
      return res.status(400).json({ message: "no entity found or already deleted" });
    }
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.UPDATE_OP, `something unexpected deleteAuction ${err}`, Models.Auction)
    res.status(500).json({ message: "Something Went Wrong" });
  }
}
module.exports = {
  getAllAuctions, getAuctionById, createNewAuction, updateAuctionData, deleteAuction
}