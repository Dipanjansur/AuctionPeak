const yup = require('yup');
const ItemsService = require("../services/ItemsService");
const BadRequestError = require('../customerror/BadRequest');
const NotFoundError = require('../customerror/NotFound');
const ForbiddenError = require('../customerror/Forbidden');
const ValidationError = require('../customerror/Validation');

// Validation Schemas
const createItemSchema = yup.object({
  ItemName: yup.string().required('Item Name is required'),
  Bio: yup.string().required('Bio is required'),
  Status: yup.string().required('Status is required'),
  ItemDescription: yup.string().required('Item Description is required'),
  CurrentPrice: yup.number().required('Current Price is required').positive('Price must be positive')
});

const updateItemSchema = yup.object({
  ItemName: yup.string(),
  Bio: yup.string(),
  Status: yup.string(),
  ItemDescription: yup.string(),
  CurrentPrice: yup.number().positive('Price must be positive')
});


const getAllItems = async (req, res) => {
  const { user, permissions } = req;

  // Catch specific service errors if needed, but 'Insufficient permission' is thrown from Service
  // We wrapped it in Controller before but now let's catch and convert.
  // The Service throws "Insufficient permission to view items"
  try {
    const items = await ItemsService.getAllItems(user, permissions, req.query);

    if (items === null) {
      throw new NotFoundError("No items found for this auction");
    }
    return res.status(200).json(items);

  } catch (err) {
    if (err.message === "Insufficient permission to view items") {
      throw new ForbiddenError(err.message);
    }
    throw err;
  }
};


const getItemByAuctionId = async (auctionId, user, permissions) => {
  return ItemsService.getItemByAuctionId(auctionId, user, permissions);
}

// GET ITEM BY ID
const getItemById = async (req, res) => {
  const { ItemId } = req.params;
  const { user, permissions } = req;

  if (!ItemId) {
    throw new BadRequestError("Item ID is required");
  }

  const item = await ItemsService.getItemById(ItemId, user, permissions);

  if (!item) {
    throw new NotFoundError("Item not found");
  }

  return res.status(200).json(item);
};

// CREATE ITEM
const createNewItem = async (req, res) => {
  const { user, permissions } = req;
  const payload = req.body;

  try {
    await createItemSchema.validate(payload, { abortEarly: false });
  } catch (validationError) {
    throw new ValidationError(validationError.errors.join(', '));
  }

  try {
    const newItem = await ItemsService.createNewItem(user, permissions, payload);
    return res.status(201).json(newItem);
  } catch (err) {
    if (err.message === "Insufficient permission to create item") {
      throw new ForbiddenError(err.message);
    }
    throw err;
  }
};

// UPDATE ITEM
const updateItemData = async (req, res) => {
  const { ItemId } = req.params;
  const updates = req.body;
  const { user, permissions } = req;

  if (!ItemId) {
    throw new BadRequestError("Item ID is required");
  }

  try {
    await updateItemSchema.validate(updates, { abortEarly: false });
  } catch (validationError) {
    throw new ValidationError(validationError.errors.join(', '));
  }

  const updatedItem = await ItemsService.updateItem(ItemId, user, permissions, updates);

  if (!updatedItem) {
    throw new NotFoundError("Item not found or unauthorized");
  }

  return res.status(200).json(updatedItem);
};

// DELETE ITEM
const deleteItem = async (req, res) => {
  const { ItemId } = req.params;
  const { user, permissions } = req;

  if (!ItemId) {
    throw new BadRequestError("Item ID is required");
  }

  const success = await ItemsService.deleteItem(ItemId, user, permissions);

  if (!success) {
    throw new NotFoundError("Item not found or unauthorized");
  }

  return res.status(200).json({ message: "Item deleted successfully" });
};

module.exports = {
  getAllItems,
  getItemById,
  createNewItem,
  updateItemData,
  deleteItem,
  getItemByAuctionId
};
