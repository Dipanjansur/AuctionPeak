const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Items = require("./Items");
const Role = require("./Roles");

const Users = sequelize.define('users', {
  usersId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,  // Automatically generate UUIDs
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  bio: {
    type: DataTypes.TEXT('medium')
  },
  isPremium: {
    type: DataTypes.ENUM('corporate', 'paid', 'verified', 'free tier', 'guest')
  },
  profilepic: {
    type: DataTypes.STRING(100),
    validate: {
      isUrl: true
    }
  }
},
);
// Users.hasMany(Items, { foreignKey: 'OwnedItems', onDelete: 'CASCADE' })
Items.belongsTo(Users, { foreignKey: 'Owner', onDelete: 'CASCADE' })
Users.belongsTo(Role);
Role.hasMany(Users);
module.exports = Users;
