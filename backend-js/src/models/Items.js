const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index");
const Users = require('./Users');
const Items = sequelize.define(
  'items',
  {
    ItemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,  // Automatically generate UUIDs
      allowNull: false,
      primaryKey: true,
    },
    // Model attributes are defined here
    ItemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ItemDescription: {
      type: DataTypes.TEXT("medium"),
      // allowNull defaults to true
    },
    CurrentPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Bio: {
      type: DataTypes.TEXT('medium')
    },
    Status: {
      type: DataTypes.ENUM('SOLD', 'LISTED', 'DISPLAY', 'ONGOING', 'PERSONAL')
    },
    Pics: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        isUrl: true
      }
    },
    BiddingStartTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    BiddingEndTime: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
);

module.exports = Items