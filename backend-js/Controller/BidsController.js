const Bids = require("../models/Bids");
const { v4: uuidv4 } = require("uuid");
const Logging = require("../utils/Logger");
const { Logging_level, Entity, Events, Models } = require("../utils/LoggerParams");

const {
  mostRecentBidsFilter,
  mostPaidBidsFilter,
  mostParticipantsBidsFilter,
} = require("../utils/bidsfilters");

const PERMISSIONS = {
  ADMIN_ACCESS: "all_bids",
  VIEW_BASIC: "view_bids",
  CREATE: "create_bids",
  UPDATE_GLOBAL: "update_bids",
  DELETE_GLOBAL: "delete_bids",
};


const getReadScope = (user, permissions) => {
  if (
    permissions.has(PERMISSIONS.ADMIN_ACCESS) ||
    permissions.has(PERMISSIONS.VIEW_BASIC)
  ) {
    return {};
  }
  return { createdBy: user.userId };
};

const getWriteScope = (user, permissions, globalPermission) => {
  if (
    permissions.has(PERMISSIONS.ADMIN_ACCESS) ||
    permissions.has(globalPermission)
  ) {
    return {};
  }
  return { createdBy: user.userId };
};

const attachItemPermissions = (bid, user, permissions) => {
  const isOwner = bid.createdBy === user.userId;

  const data = bid.toJSON ? bid.toJSON() : bid;

  return {
    ...data,
    permission: {
      isOwner,
      canUpdate:
        permissions.has(PERMISSIONS.ADMIN_ACCESS) ||
        permissions.has(PERMISSIONS.UPDATE_GLOBAL) ||
        isOwner,
      canDelete:
        permissions.has(PERMISSIONS.ADMIN_ACCESS) ||
        permissions.has(PERMISSIONS.DELETE_GLOBAL) ||
        isOwner,
    },
  };
};

const getAllBids = async (req, res) => {
  try {
    const { user, permissions } = req;
    const scope = getReadScope(user, permissions);

    Logging(
      Logging_level.info,
      Entity.Controller,
      Events.READ_OP,
      `Fetching bids with scope ${JSON.stringify(scope)}`,
      Models.Bids
    );

    const bids = await Bids.findAll({ where: scope });
    if (!bids || bids.length === 0) return res.status(200).json([]);

    const responseData = bids.map((bid) =>
      attachItemPermissions(bid, user, permissions)
    );

    return res.status(200).json(responseData);
  } catch (err) {
    Logging(
      Logging_level.error,
      Entity.Controller,
      Events.READ_OP,
      `Error in getAllBids: ${err.message}`,
      Models.Bids
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBidsById = async (req, res) => {
  try {
    const { BidsId } = req.params;
    const { user, permissions } = req;

    const scope = getReadScope(user, permissions);

    const bid = await Bids.findOne({
      where: {
        BidsId,
        ...scope,
      },
    });

    if (!bid) {
      return res
        .status(404)
        .json({ message: "Bid not found or access denied" });
    }

    return res.status(200).json(attachItemPermissions(bid, user, permissions));
  } catch (err) {
    Logging(
      Logging_level.error,
      Entity.Controller,
      Events.READ_OP,
      `Error in getBidsById: ${err.message}`,
      Models.Bids
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewBids = async (req, res) => {
  try {
    const { user, permissions } = req;
    const payload = req.body;

    const canCreate =
      permissions.includes(PERMISSIONS.CREATE) ||
      permissions.includes(PERMISSIONS.ADMIN_ACCESS);

    if (!canCreate)
      return res
        .status(403)
        .json({ message: "Insufficient permissions to create bid" });

    if (!payload.amount)
      return res.status(400).json({ message: "Missing bid amount" });

    const createdBid = await Bids.create({
      BidsId: uuidv4(),
      amount: payload.amount,
      createdBy: user.userId,
      AuctionId: payload.AuctionId,
    });

    Logging(
      Logging_level.info,
      Entity.Controller,
      Events.CREATE_OP,
      `Created bid ${createdBid.BidsId}`,
      Models.Bids
    );

    return res.status(201).json(createdBid);
  } catch (err) {
    Logging(
      Logging_level.error,
      Entity.Controller,
      Events.CREATE_OP,
      `Error in createNewBids: ${err.message}`,
      Models.Bids
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBids = async (req, res) => {
  try {
    const { BidsId } = req.params;
    const updates = req.body;
    const { user, permissions } = req;

    if (!updates.amount)
      return res.status(400).json({ message: "No data to update" });

    const scope = getWriteScope(user, permissions, PERMISSIONS.UPDATE_GLOBAL);

    const bid = await Bids.findOne({
      where: { BidsId, ...scope },
    });

    if (!bid)
      return res
        .status(404)
        .json({ message: "Bid not found or unauthorized" });

    bid.amount = updates.amount;
    await bid.save();

    return res.status(200).json(attachItemPermissions(bid, user, permissions));
  } catch (err) {
    Logging(
      Logging_level.error,
      Entity.Controller,
      Events.UPDATE_OP,
      `Error in updateBids: ${err.message}`,
      Models.Bids
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteBids = async (req, res) => {
  try {
    const { BidsId } = req.params;
    const { user, permissions } = req;

    const scope = getWriteScope(user, permissions, PERMISSIONS.DELETE_GLOBAL);

    const deletedCount = await Bids.destroy({
      where: { BidsId, ...scope },
    });

    if (deletedCount === 0)
      return res
        .status(404)
        .json({ message: "Bid not found or unauthorized" });

    Logging(
      Logging_level.info,
      Entity.Controller,
      Events.DELETE_OP,
      `Deleted bid ${BidsId}`,
      Models.Bids
    );

    return res.status(200).json({ message: "Bid deleted successfully" });
  } catch (err) {
    Logging(
      Logging_level.error,
      Entity.Controller,
      Events.DELETE_OP,
      `Error in deleteBids: ${err.message}`,
      Models.Bids
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBids,
  getBidsById,
  createNewBids,
  updateBids,
  deleteBids,
};
