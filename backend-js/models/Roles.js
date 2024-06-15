const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index");

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.ENUM,
    values: ['ADMIN', 'USER', 'FREE-TIER', 'MODS'],
    allowNull: false,
    unique: true,
  },
});

// Define associations
module.exports = Role