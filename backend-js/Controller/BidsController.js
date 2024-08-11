const Bids = require("../models/Bids");
const { v4: uuidv4 } = require('uuid');
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");
const Logging = require("../utils/Logger");
const { mostRecentBidsFilter, mostParticipantsBidsFilter, mostPaidBidsFilter } = require("../utils/bidsfilters");

const getAllBids = async (req, res) => {
  try {
    const retrievedBids = await Bids.findAll();
    if (retrievedBids == null) {
      Logging(Logging_level.warn, Entity.Controller, Events.READ_OP, Models.Bids, "no entity found getAllBids")
      return res.status(400).json({ message: "no entity found" })
    }
    Logging(Logging_level.info, Entity.Controller, Events.READ_OP, Models.Bids, ` got data getAllBids${retrievedBids}`)
    const res_json = []
    try {
      const recentBids = await mostRecentBidsFilter();
      res_json.push({ "tittle": "Most Recent Bids", value: recentBids })
      const mostpaid = await mostPaidBidsFilter();
      res_json.push({ "tittle": "Most Paid Bids", value: mostpaid })
      // const mostparticipants = await mostParticipantsBidsFilter();
      // res_json.push({ "tittle": "Most Recent Bids", value: recentBids })
      return res.status(200).json({ message: res_json })
    }
    catch (err) {
      console.log(err)
      return res.status(200).json({ message: retrievedBids })
    }

  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.READ_OP, Models.Bids, `something went wrong in getAllBids${err}`)
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
      Logging(Logging_level.warn, Entity.Controller, Events.READ_OP, Models.Bids, "no entity found getBidsById")
      return res.status(400).json({ message: "no entity found" })
    }
    Logging(Logging_level.info, Entity.Controller, Events.READ_OP, Models.Bids, ` got data getBidsById${retrievedBids}`)
    return res.status(200).json({ message: retrievedBids });
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.READ_OP, Models.Bids, `something went wrong in getBidsById${err}`)
    return res.status(500).json({ message: "something went wrong" })
  }
}

const createNewBids = async (req, res) => {
  const newBids = req.body
  try {
    const createdBid = await Bids.create({ BidsId: uuidv4(), amount: newBids.amount });
    Logging(Logging_level.info, Entity.Controller, Events.CREATE_OP, Models.Bids, `created a new Auction with id ${createdBid.BidsId} createNewBids`)
    return res.status(201).json({ message: `Creating a new auction with Id createNewBids, ${createdBid.BidsId}` });
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.CREATE_OP, Models.Bids, `something unexpected createNewBids" + ${err}`)
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
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, Models.Bids, "no entity found updateBids")
      return res.status(400).json({ message: "no entity found with that Id" })
    }
    if ((Bid.amount == null) || (RetrivedBids.name == Bid.name)) {
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, Models.Bids, `please check the request parameters updateBids.Not a valid request ${req}`)
      return res.status(404).json({ message: "please check the request parameters.Not a valid request" })
    }
    (auction.name != null) && (RetrivedBids.name = auction.name);
    (auction.startTime != null) && (RetrivedBids.startTime = auction.startTime);
    (auction.endTime != null) && (RetrivedBids.endTime = auction.endTime);
    await RetrivedBids.save()
    Logging(Logging_level.info, Entity.Controller, Events.UPDATE_OP, Models.Bids, `updated successfully updateBids`)
    return res.status(200).json({ message: RetrivedBids });
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.UPDATE_OP, Models.Bids, `something unexpected updateBids ${err}`)
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
      Logging(Logging_level.info, Entity.Controller, Events.UPDATE_OP, Models.Bids, `deleted successfully deleteBids`)
      return res.status(200).json({ message: "sucessfully deleted" });
    } else {
      Logging(Logging_level.warn, Entity.Controller, Events.UPDATE_OP, Models.Bids, "no entity found or already deleted deleteBids")
      return res.status(200).json({ message: RetrivedBids });
    }
  }
  catch (err) {
    Logging(Logging_level.error, Entity.Controller, Events.UPDATE_OP, Models.Bids, `something unexpected deleteBids ${err}`)
    console.log("something unexpected" + err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
}
module.exports = {
  getAllBids, getBidsById, createNewBids, updateBids, deleteBids
}