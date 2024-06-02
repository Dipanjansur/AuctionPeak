const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./Users");
const Items = require("./Items");

const Bids = sequelize.define('Bids', {
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
