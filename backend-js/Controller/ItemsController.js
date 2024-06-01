const getAllItems = (req, res) => {
  res.status(200).json({ message: "Fetching all Items" });
}

const getItemById = (req, res) => {
  const { ItemId } = req.params;
  res.status(200).json({ message: `Fetching Items with ID: ${ItemId}` });
}

const createNewItem = (req, res) => {
  // Assuming you will process and validate Items data here
  res.status(201).json({ message: "Creating a new Items" });
}

const updateItemData = (req, res) => {
  const { ItemId } = req.params;
  // Assuming you will process and validate Items update data here
  res.status(200).json({ message: `Updating Items with ID: ${ItemId}` });
}

const deleteItem = (req, res) => {
  const { ItemId } = req.params;
  // Assuming you will handle Items deletion here
  res.status(200).json({ message: `Deleting Items with ID: ${ItemId}` });
}
module.exports = {
  getAllItems, getItemById, createNewItem, updateItemData, deleteItem
}