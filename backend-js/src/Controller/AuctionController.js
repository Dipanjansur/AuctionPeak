const yup = require('yup');
const AuctionService = require('../services/AuctionServices');
const BadRequestError = require('../customerror/BadRequest');
const NotFoundError = require('../customerror/NotFound');
const ForbiddenError = require('../customerror/Forbidden');
const ValidationError = require('../customerror/Validation');

// Validation Schemas
const createAuctionSchema = yup.object({
  name: yup.string().required('Name is required'),
  startTime: yup.date().required('Start time is required'),
  duration: yup.number().required('Duration is required').min(10, 'Duration must be at least 1').max(400, 'Duration must be at most 400'),
  auctionPic: yup.array().of(yup.string().url('Invalid URL').required('Auction picture is required')),
  AuctionDetails: yup.string().required('Auction details is required').max(1000, 'Auction details must be at most 1000 characters'),
});

const updateAuctionSchema = yup.object({
  name: yup.string(),
  startTime: yup.date(),
  endTime: yup.date()
    .min(yup.ref('startTime'), 'End time must be after start time'),
  AuctionDetails: yup.string().max(1000, 'Auction details must be at most 1000 characters'),
});
const registerorUnregisterAuctionSchema = yup.object({
  auctionId: yup.string().required('Auction ID is required'),
});


const getAllAuctions = async (req, res) => {
  const { user, permissions } = req;
  const auctions = await AuctionService.getAllAuctions(user, permissions);
  return res.status(200).json(auctions);
};

const getAuctionById = async (req, res) => {
  const { auctionId } = req.params;
  const { user, permissions } = req;

  if (!auctionId) {
    throw new BadRequestError("Auction ID is required");
  }

  const auction = await AuctionService.getAuctionById(auctionId, user, permissions);

  if (!auction) {
    throw new NotFoundError("Auction not found or unauthorized");
  }

  return res.status(200).json(auction);
};

const createNewAuction = async (req, res) => {
  const { user, permissions } = req;
  const payload = req.body;

  try {
    await createAuctionSchema.validate(payload, { abortEarly: false });
  } catch (validationError) {
    throw new ValidationError(validationError.errors.join(', '));
  }

  try {
    const newAuction = await AuctionService.createAuction(user, permissions, payload);
    return res.status(201).json(newAuction);
  } catch (err) {
    if (err.message === "Insufficient permissions to create an auction") {
      throw new ForbiddenError(err.message);
    }
    throw err;
  }
};

const updateAuctionData = async (req, res) => {
  const { auctionId } = req.params;
  const updates = req.body;
  const { user, permissions } = req;

  if (!auctionId) {
    throw new BadRequestError("Auction ID is required");
  }

  try {
    await updateAuctionSchema.validate(updates, { abortEarly: false });
  } catch (validationError) {
    throw new ValidationError(validationError.errors.join(', '));
  }

  if (Object.keys(updates).length === 0) {
    throw new BadRequestError("No update data provided");
  }

  const updatedAuction = await AuctionService.updateAuction(auctionId, user, permissions, updates);

  if (!updatedAuction) {
    throw new NotFoundError("Auction not found or unauthorized");
  }

  return res.status(200).json(updatedAuction);
};

const deleteAuction = async (req, res) => {
  const { auctionId } = req.params;
  const { user, permissions } = req;

  if (!auctionId) {
    throw new BadRequestError("Auction ID is required");
  }

  const success = await AuctionService.deleteAuction(auctionId, user, permissions);

  if (!success) {
    throw new NotFoundError("Auction not found or unauthorized");
  }

  return res.status(200).json({ message: "Auction deleted successfully" });
};

const registerAuction = async (req, res) => {
  const { auctionId } = req.body;
  const { user, permissions } = req;
  try {
    await registerorUnregisterAuctionSchema.validate(req.body, { abortEarly: false });
  } catch (validationError) {
    throw new ValidationError(validationError.errors.join(', '));
  }
  if (!auctionId) {
    throw new BadRequestError("Auction ID is required");
  }

  const success = await AuctionService.registerAuction(auctionId, user, permissions);

  return res.status(200).json({ message: "Auction registered successfully" });
};

const unregisterAuction = async (req, res) => {
  const { auctionId } = req.body;
  const { user, permissions } = req;
  try {
    await registerorUnregisterAuctionSchema.validate(req.body, { abortEarly: false });
  } catch (validationError) {
    throw new ValidationError(validationError.errors.join(', '));
  }

  if (!auctionId) {
    throw new BadRequestError("Auction ID is required");
  }

  const success = await AuctionService.unregisterAuction(auctionId, user, permissions);

  return res.status(200).json({ message: "Auction unregistered successfully" });
};

module.exports = {
  getAllAuctions,
  getAuctionById,
  createNewAuction,
  updateAuctionData,
  deleteAuction,
  registerAuction,
  unregisterAuction
};