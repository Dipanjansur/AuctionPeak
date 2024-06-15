const { scoped } = require("../middleware/PermisssionManager");
const { Auction } = require("../models/Auctions");

const { v4: uuidv4 } = require('uuid');
const Logging = require("../utils/Logger");
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");
const getAllAuctions = async (req, res) => {
  try {
    const retrievedAuction = await Auction.findAll({});
    if (retrievedAuction == null) {
      Logging(Logging_level.warn, Entity.Controller, Events.READ_OP, Models.Auction, "no entity found getAllAuctions")
      return res.status(400).json({ message: "no entity found" })
    }
    Logging(Logging_level.info, Entity.Controller, Events.READ_OP, Models.Auction, ` got data getAllAuctions${retrievedAuction}`)
    return res.status(200).json(retrievedAuction)
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.READ_OP, Models.Auction, `something went wrong in getAllAuctions${err}`)
    return res.status(500).json({ message: "something went wrong" })
  }
}

const getAuctionById = async (req, res) => {
  const { auctionId } = req.params
  try {
    const retrievedAuction = await Auction.findOne({
      where: {
        AuctionId: auctionId,
      },
    });
    if (retrievedAuction == null) {
      Logging(Logging_level.warn, Entity.Controller, Events.READ_OP, Models.Auction, "no entity found getAuctionById")
      return res.status(400).json({ message: "no entity found" })
    }
    Logging(Logging_level.info, Entity.Controller, Events.READ_OP, Models.Auction, ` got data getAuctionById${retrievedAuction}`)
    return res.status(200).json({ message: retrievedAuction });
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.READ_OP, Models.Auction, `something went wrong in getAuctionById${err}`)
    return res.status(500).json({ message: "something went wrong" })
  }
}

const createNewAuction = async (req, res) => {
  const newAuction = req.body
  try {
    const createdAuction = await Auction.create({ AuctionId: uuidv4(), name: newAuction.name, startTime: newAuction.startTime, endTime: newAuction.endTime });
    Logging(Logging_level.info, Entity.Controller, Events.CREATE_OP, Models.Auction, `created a new Auction with id ${createdAuction.AuctionId} getAuctionById`)
    return res.status(200).json({ message: `Creating a new auction with Id, ${createdAuction.AuctionId}` });
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.CREATE_OP, Models.Auction, `something unexpected" + ${err}`)
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
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, Models.Auction, "no entity found updateAuctionData")
      return res.status(400).json({ message: "no entity found with that Id" })
    }
    if ((auction.name == auction.startTime == auction.endTime == null) || ((Retrivedauction.name == auction.name && Retrivedauction.startTime == auction.startTime) && Retrivedauction.endTime == auction.endTime)) {
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, Models.Auction, `please check the request parameters updateAuctionData.Not a valid request ${req}`)
      return res.status(404).json({ message: "please check the request parameters.Not a valid request" })
    }
    (auction.name != null) && (Retrivedauction.name = auction.name);
    (auction.startTime != null) && (Retrivedauction.startTime = auction.startTime);
    (auction.endTime != null) && (Retrivedauction.endTime = auction.endTime);
    await Retrivedauction.save();
    Logging(Logging_level.info, Entity.Controller, Events.UPDATE_OP, Models.Auction, `updated successfully updateAuctionData`)
    return res.status(200).json({ message: Retrivedauction });
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.UPDATE_OP, Models.Auction, `something unexpected updateAuctionData ${err}`)
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
      Logging(Logging_level.info, Entity.Controller, Events.UPDATE_OP, Models.Auction, `deleted successfully deleteAuction`)
      return res.status(200).json({ message: "sucessfultty deleted" });
    } else {
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, Models.Auction, "no entity found or already deleted deleteAuction")
      return res.status(400).json({ message: "no entity found or already deleted" });
    }
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.UPDATE_OP, Models.Auction, `something unexpected deleteAuction ${err}`)
    res.status(500).json({ message: "Something Went Wrong" });
  }
}
module.exports = {
  getAllAuctions, getAuctionById, createNewAuction, updateAuctionData, deleteAuction
}