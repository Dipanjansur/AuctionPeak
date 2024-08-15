const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("./index");
const Permission = require('./Permissions');

const Role = sequelize.define('Roles', {
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
// Role.belongsToMany(Users, { foreignKey: 'rulesId', onDelete: 'CASCADE' })
Permission.belongsToMany(Role, { through: "RolesPerm", foreignKey: "RoleId", otherKey: "premId" });
// Define associations
module.exports = Role