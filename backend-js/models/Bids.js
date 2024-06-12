const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./Users");
const Items = require("./Items");

const Bids = sequelize.define('bids', {
  BidsId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate UUIDs
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: true
});

Bids.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Bids.belongsTo(Items, { foreignKey: 'itemId', onDelete: 'CASCADE' });

module.exports = Bids;
