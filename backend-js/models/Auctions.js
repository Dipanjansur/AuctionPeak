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
  AuctionDetails: {
    type: DataTypes.TEXT("medium"),
    // allowNull defaults to true
  },
  isPremium: {
    type: DataTypes.ENUM('corporate', 'paid', 'verified', 'free tier', 'guest')
  },
  auctionPic: {
    type: DataTypes.STRING(100),
    validate: {
      isUrl: true
    },
  },
  createdBy:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate UUIDs
    allowNull: false,
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
Auction.belongsTo(User,{foreignKey:"createdBy"})
Auction.belongsToMany(User, {through: 'AuctionParticipants',as: 'participants',foreignKey: 'auctionId',otherKey: 'userId'});
Items.belongsTo(Auction, { foreignKey: 'auctionId' });
Auction.hasMany(Bids, { as: 'bids', foreignKey: 'auctionId' });
module.exports = { Auction, AuctionParticipants };