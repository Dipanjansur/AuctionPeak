const Bids = require("../models/Bids");
const { v4: uuidv4 } = require('uuid');

const getAllBids = async (req, res) => {
  try {
    const retrievedBids = await Bids.findAll();
    if (retrievedBids == null) {
      return res.status(400).json({ message: "no entity found" })
    }
    return res.status(200).json({ message: retrievedBids })
  }
  catch (err) {
    return res.status(500).json({ message: "something went wrong" })
  }
}

const getBidsById = async (req, res) => {
  const { BidsId } = req.params
  try {
    const retrievedBids = await Bids.findOne({
      where: {
        BidsId: BidsId,
      },
    });
    if (retrievedBids == null) {
      return res.status(400).json({ message: "no entity found" })
    }
    return res.status(200).json({ message: retrievedBids });
  }
  catch (err) {
    return res.status(500).json({ message: "something went wrong" })
  }
}

const createNewBids = async (req, res) => {
  const newBids = req.body
  try {
    const createdBid = await Bids.create({ BidsId: uuidv4(), amount: newBids.amount });
    return res.status(201).json({ message: `Creating a new auction with Id, ${createdBid.BidsId}` });
  }
  catch (err) {
    console.log("something unexpected" + err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
}

const updateBids = async (req, res) => {
  const { BidsId } = req.params
  const Bid = req.body
  try {
    const RetrivedBids = await Bids.findOne({
      where: {
        BidsId: BidsId,
      },
    });
    if (RetrivedBids == null) {
      return res.status(400).json({ message: "no entity found with that Id" })
    }
    if ((Bid.amount == null) || (RetrivedBids.name == Bid.name)) {
      return res.status(404).json({ message: "please check the request parameters.Not a valid request" })
    }
    (auction.name != null) && (RetrivedBids.name = auction.name);
    (auction.startTime != null) && (RetrivedBids.startTime = auction.startTime);
    (auction.endTime != null) && (RetrivedBids.endTime = auction.endTime);
    await RetrivedBids.save()
    return res.status(200).json({ message: RetrivedBids });
  }
  catch (err) {
    console.log("something unexpected" + err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
}

const deleteBids = async (req, res) => {
  const { BidsId } = req.params
  try {
    const RetrivedBids = await Auction.destroy({
      where: {
        BidsId: BidsId,
      },
    });
    if (RetrivedBids == 1) {
      return res.status(200).json({ message: "sucessfully deleted" });
    } else {
      return res.status(200).json({ message: RetrivedBids });
    }
  }
  catch (err) {
    console.log("something unexpected" + err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
}
module.exports = {
  getAllBids, getBidsById, createNewBids, updateBids, deleteBids
}