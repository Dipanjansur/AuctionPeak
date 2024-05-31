const express = require('express');
const app = express();
const sequelize = require('./models/index');
const Users = require('./models/Users');
const Items = require('./models/Items');
const Bids = require("./models/Bids");
const { Auction, AuctionParticipants, AuctionItems } = require('./models/Auctions');
const port = process.env.PORT || 9000;
app.get('/health-check', (req, res) => {
  res.send('Server is healty')
})
// Routes
app.listen(port, async () => {
  sequelize.authenticate()
    .then((result) => {
      console.log("The database is connected")
    }).catch((err) => {
      console.log(`something wrong in database connection ${err}`)
    })
  sequelize
    .sync({ force: true, logging: console.log })
    .then((result) => {
      console.log("All the models are synced")
    }).catch((err) => {
      console.log(`something wrong in models sync ${err}`)

    })
  console.log(`Listening on port ${port}`);
})
