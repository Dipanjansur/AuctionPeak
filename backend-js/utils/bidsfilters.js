const sequelize = require("../models");
const Bids = require("../models/Bids");
const Items = require("../models/Items");

// TODO: create a database field and move all of them to them there
config_filter = {
  bids: {
    mostRecent: true,
    mostPaid: true,
    mostParticipants: true,
  },
}
const mostRecentBidsFilter = async () => {
  const recentBids = await Bids.findAll({
    order: [['createdAt', 'DESC']],
    limit: 15,
    include: [Items],
  });
  return recentBids;
}

const mostPaidBidsFilter = async () => {
  const recentBids = await Bids.findAll({
    order: [['amount', 'DESC']],
    limit: 15,
    include: [Items],
  });
  return recentBids;
}


const mostParticipantsBidsFilter = async () => {
  const itemsWithMostParticipants = await Bids.findAll({
    attributes: [
      'itemId',
      [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('userId'))), 'participantsCount']
    ],
    // group: ['itemId'],
    order: [[sequelize.literal('participantsCount'), 'DESC']],
    limit: 10,
    include: [Items],
  });
  return itemsWithMostParticipants;
}

module.exports = {
  mostPaidBidsFilter, mostParticipantsBidsFilter, mostRecentBidsFilter
}