const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index");
const Permission = sequelize.define('Permission', {
  PermissionId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate UUIDs
    allowNull: false,
    primaryKey: true,
  },
  PermissionName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  action: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  resource: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Permission