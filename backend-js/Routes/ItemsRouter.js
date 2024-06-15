const express = require('express');
const { getAllItems, getItemById, createNewItem, updateItemData, deleteItem } = require('../Controller/ItemsController');
const isAuthticated = require('../middleware/isAuthticated');
// const { canView, canUpdate } = require('../middleware/PermisssionManager');
const ItemsRouter = express.Router();
ItemsRouter.get('/', isAuthticated, getAllItems);
ItemsRouter.get('/:ItemId', isAuthticated, getItemById)
ItemsRouter.post('/', createNewItem)
ItemsRouter.patch('/:ItemId', isAuthticated, updateItemData)
ItemsRouter.delete('/:ItemId', isAuthticated, deleteItem)
module.exports = ItemsRouter;