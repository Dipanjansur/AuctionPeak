const { scoped } = require("../middleware/PermisssionManager");
const { Auction } = require("../models/Auctions");
const { v4: uuidv4 } = require('uuid');
const getAllAuctions = async (req, res) => {
  try {
    const retrievedAuction = await Auction.findAll({});
    if (retrievedAuction == null) {
      return res.status(400).json({ message: "no entity found" })
    }
    return res.status(200).json(retrievedAuction)
  }
  catch (err) {
    console.log(err);
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
      return res.status(400).json({ message: "no entity found" })
    }
    return res.status(200).json({ message: retrievedAuction });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" })
  }
}

const createNewAuction = async (req, res) => {
  const newAuction = req.body
  try {
    const createdAuction = await Auction.create({ AuctionId: uuidv4(), name: newAuction.name, startTime: newAuction.startTime, endTime: newAuction.endTime });
    return res.status(200).json({ message: `Creating a new auction with Id, ${createdAuction.AuctionId}` });
  }
  catch (err) {
    console.log("something unexpected" + err);
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
      return res.status(400).json({ message: "no entity found with that Id" })
    }
    if ((auction.name == auction.startTime == auction.endTime == null) || ((Retrivedauction.name == auction.name && Retrivedauction.startTime == auction.startTime) && Retrivedauction.endTime == auction.endTime)) {
      return res.status(404).json({ message: "please check the request parameters.Not a valid request" })
    }
    (auction.name != null) && (Retrivedauction.name = auction.name);
    (auction.startTime != null) && (Retrivedauction.startTime = auction.startTime);
    (auction.endTime != null) && (Retrivedauction.endTime = auction.endTime);
    await Retrivedauction.save();
    return res.status(200).json({ message: Retrivedauction });
  }
  catch (err) {
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
      return res.status(200).json({ message: "sucessfultty deleted" });
    } else {
      return res.status(400).json({ message: "no entity found or already deleted" });
    }
  }
  catch (err) {
    console.log("something unexpected" + err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
}
module.exports = {
  getAllAuctions, getAuctionById, createNewAuction, updateAuctionData, deleteAuction
}