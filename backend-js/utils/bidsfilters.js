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

const getReadScope = (user, permissions) => {
  if (permissions.includes(PERMISSIONS.ADMIN_ACCESS) || permissions.includes(globalPermission)) {
    return {}
  }
  return{createdBy:user.userId}; 
}

const getWriteScope=(user,permissions,otherPermissions)=>{
  if(permissions.include(PERMISSIONS.ADMIN_ACCESS)|| permissions.include(PERMISSIONS.otherPermissions)){
    return {}
  }
  return {createdBy:user.userId};
}


const mostRecentBidsFilter = async (page,limit) => {
  const recentBids = await Bids.findAll({
    order: [['createdAt', 'DESC']],
    limit: limit || 15,
    offset: page && limit ? (page - 1) * limit : 0,
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