const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index");
const Permission = require('./Permissions');

const Roles = sequelize.define('Roles', {
  RoleId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate UUIDs
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.ENUM,
    values: ['ADMIN', 'CREATOR', "MANAGERS", "GUEST", 'FREE-TIER', "SUBSCIBER", "PARTICIPANTS", 'MODS'],
    allowNull: false,
    unique: true,
  },
});
Roles.belongsToMany(Permission, { 
  through: "RolesPerm", 
  foreignKey: "RoleId", 
  otherKey: "PermissionId"
});
Permission.belongsToMany(Roles, { through: "RolesPerm", foreignKey: "PermissionId", otherKey: "RoleId",primaryKey:"RolePermissionId" });
// Define associations
module.exports = Roles