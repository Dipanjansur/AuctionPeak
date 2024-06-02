const express = require('express');
const { getAllItems, getItemById, createNewItem, updateItemData, deleteItem } = require('../Controller/ItemsController');
const ItemsRouter = express.Router();
ItemsRouter.get('/', getAllItems);
ItemsRouter.get('/:ItemId', getItemById)
ItemsRouter.post('/', createNewItem)
ItemsRouter.patch('/:ItemId', updateItemData)
ItemsRouter.delete('/:ItemId', deleteItem)
module.exports = ItemsRouter;