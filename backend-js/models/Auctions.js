const { DataTypes } = require("sequelize");
const sequelize = require(".");
const User = require("./Users");
const Items = require("./Items");
const Bids = require("./Bids");

const Auction = sequelize.define('auction', {
  AuctionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate UUIDs
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  timestamps: true
});
const AuctionParticipants = sequelize.define('AuctionParticipants', {}, { timestamps: false });
const AuctionItems = sequelize.define('AuctionItems', {}, { timestamps: false });
module.exports = { AuctionParticipants, AuctionItems };
Auction.belongsToMany(User, { through: 'AuctionParticipants', as: 'participants', foreignKey: 'auctionId' });
Auction.belongsToMany(Items, { through: 'AuctionItems', as: 'items', foreignKey: 'auctionId' });
Auction.hasMany(Bids, { as: 'bids', foreignKey: 'auctionId' });

module.exports = { Auction, AuctionParticipants, AuctionItems };