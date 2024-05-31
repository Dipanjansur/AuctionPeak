const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index");
const Users = require('./Users');

const Items = sequelize.define(
  'Items',
  {
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
    //TODO: fix it
    Owner: {
      type: DataTypes.STRING,
    },
    bio: {
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
    }
  },
);

module.exports = Items