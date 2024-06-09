const Sequelize = require("sequelize");
const POSTGRES_USER = process.env.POSTGRES_USER || "postgres";
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "qwert";
const POSTGRES_HOST = process.env.POSTGRES_HOST || "127.0.0.1:5432";
const POSTGRES_DB = process.env.POSTGRES_DB || "AuctionPeak";

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB}`, {
  dialect: "postgres",
  host: "localhost",
  // logQueryParameters: true,
  // benchmark: true,
  // pool: {
  //   max: 5,
  //   min: 0,
  //   idle: 10000
  // }
});
// We define all models according to their files.
// const connectTOdb = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// async function syncModels() {
//   try {
//     await sequelize.sync({ force: false }); // 'force: false' will not drop tables if they already exist
//     console.log('All models were synchronized successfully.');
//   } catch (error) {
//     console.error('An error occurred while synchronizing the models:', error);
//   }
// }
// We export the sequelize connection instance to be used around our app.
module.exports = sequelize