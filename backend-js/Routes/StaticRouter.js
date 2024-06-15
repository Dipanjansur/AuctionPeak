const express = require('express');
const { aboutUsData, goalsData, pricingData, membersData } = require('../Controller/StaticPageController');
const StaticPageRouter = express.Router();
StaticPageRouter.get('/aboutus', aboutUsData);
StaticPageRouter.get('/goals', goalsData)
StaticPageRouter.get('/pricing', pricingData)
StaticPageRouter.get('/members', membersData)
module.exports = StaticPageRouter;