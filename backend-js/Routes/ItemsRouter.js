const express = require('express');
const { getAllItems, getItemById, createNewItem, updateItemData, deleteItem } = require('../Controller/ItemsController');
const isAuthticated = require('../middleware/isAuthticated');
const RolePermInjector = require('../middleware/RolePermInjector');
const ItemsRouter = express.Router();
ItemsRouter.get('/',isAuthticated,RolePermInjector, getAllItems);
ItemsRouter.get('/:ItemId',isAuthticated,RolePermInjector, getItemById)
ItemsRouter.post('/',isAuthticated,RolePermInjector, createNewItem)
ItemsRouter.patch('/:ItemId',isAuthticated,RolePermInjector, updateItemData)
ItemsRouter.delete('/:ItemId',isAuthticated,RolePermInjector, deleteItem)
module.exports = ItemsRouter;