const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index");
const Users = require('./Users');

const Role = sequelize.define('Role', {
  RoleId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate UUIDs
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.ENUM,
    values: ['ADMIN', 'USER', 'FREE-TIER', 'MODS'],
    allowNull: false,
    unique: true,
  },
});
// Define associations
module.exports = Role