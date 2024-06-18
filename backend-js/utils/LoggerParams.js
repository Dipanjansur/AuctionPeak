const { Auction } = require("../models/Auctions");

const Entity = {
  Database: 'Database',
  Route: 'Route',
  Middleware: 'Middleware',
  Controller: 'Controller',
  UTILS: 'UTILS',
  SERVER: 'SERVER'
};
const Logging_level = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  http: 'http',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly'

}
const Events = {
  CONNECTION: 'CONNECTION',
  CREATE_OP: 'CREATE_OP',
  READ_OP: 'READ_OP',
  UPDATE_OP: 'UPDATE_OP',
  DELETE_OP: 'DELETE_OP',
  Auction: 'Auction',
  SERVER_ACTIVITIES: 'SERVER_ACTIVITIES'
};
const Models = {
  Auction: 'Auction',
  Bids: 'Bids',
  Items: 'Items',
  Users: 'Users',
  Roles: 'Roles',
}
module.exports = { Events, Logging_level, Entity, Models }