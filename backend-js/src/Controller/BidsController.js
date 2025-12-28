const yup = require('yup');
const BidsService = require("../services/BidsService");
const BadRequestError = require('../customerror/BadRequest');
const NotFoundError = require('../customerror/NotFound');
const ForbiddenError = require('../customerror/Forbidden');
const ValidationError = require('../customerror/Validation');

// Validation Schemas
const createBidSchema = yup.object({
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
  ItemId: yup.string().required('Item ID is required')
});

const updateBidSchema = yup.object({
  amount: yup.number().required('Amount is required').positive('Amount must be positive')
});

const getAllBids = async (req, res) => {
  const { user, permissions } = req;
  const bids = await BidsService.getAllBids(user, permissions);
  return res.status(200).json(bids);
};

const getBidsById = async (req, res) => {
  const { BidsId } = req.params;
  const { user, permissions } = req;

  if (!BidsId) {
    throw new BadRequestError("Bid ID is required");
  }

  const bid = await BidsService.getBidsById(BidsId, user, permissions);

  if (!bid) {
    throw new NotFoundError("Bid not found or access denied");
  }

  return res.status(200).json(bid);
};

const createNewBids = async (req, res) => {
  const { user, permissions } = req;
  const payload = req.body;

  try {
    await createBidSchema.validate(payload, { abortEarly: false });
  } catch (validationError) {
    throw new ValidationError(validationError.errors.join(', '));
  }

  try {
    const createdBid = await BidsService.createNewBid(user, permissions, payload);
    return res.status(201).json(createdBid);
  } catch (err) {
    if (err.message === "Insufficient permissions to create bid") {
      throw new ForbiddenError(err.message);
    }
    if (err.message === "Item not found") {
      throw new NotFoundError(err.message);
    }
    throw err;
  }
};

const updateBids = async (req, res) => {
  const { BidsId } = req.params;
  const updates = req.body;
  const { user, permissions } = req;

  if (!BidsId) {
    throw new BadRequestError("Bid ID is required");
  }

  try {
    await updateBidSchema.validate(updates, { abortEarly: false });
  } catch (validationError) {
    throw new ValidationError(validationError.errors.join(', '));
  }

  const updatedBid = await BidsService.updateBid(BidsId, user, permissions, updates);

  if (!updatedBid) {
    throw new NotFoundError("Bid not found or unauthorized");
  }

  return res.status(200).json(updatedBid);
};

const deleteBids = async (req, res) => {
  const { BidsId } = req.params;
  const { user, permissions } = req;

  if (!BidsId) {
    throw new BadRequestError("Bid ID is required");
  }

  const success = await BidsService.deleteBid(BidsId, user, permissions);

  if (!success) {
    throw new NotFoundError("Bid not found or unauthorized");
  }

  return res.status(200).json({ message: "Bid deleted successfully" });
};

const bidsUpdate = async (req, res) => {
  const { interests } = req.query;
  let interestsArray = [];

  if (interests) {
    if (Array.isArray(interests)) {
      interestsArray = interests;
    } else {
      interestsArray = interests.split(',').map(i => i.trim());
    }
  }

  BidsService.registerClient(req, res, interestsArray);
};

module.exports = {
  getAllBids,
  getBidsById,
  createNewBids,
  updateBids,
  deleteBids,
  bidsUpdate
};
