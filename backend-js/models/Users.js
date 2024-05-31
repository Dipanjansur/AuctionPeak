const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Items = require("./Items");

const Users = sequelize.define('users', {
  // Model attributes are defined here
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
Users.hasMany(Items, { foreignKey: 'ItmesId', onDelete: 'CASCADE' })
Items.belongsTo(Users, { foreignKey: 'userId', onDelete: 'CASCADE' })

module.exports = Users;
