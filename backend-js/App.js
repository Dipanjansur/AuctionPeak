const express = require('express');
const app = express();
app.use(express.json())
const AuctionRouter = require('./Routes/AuctionRouter');
const UsersRouter = require('./Routes/UsersRouter');
const ItemsRouter = require('./Routes/ItemsRouter');
const StaticPageRouter = require('./Routes/StaticRouter');
const sequelize = require('./models/index');
const Users = require('./models/Users');
const Items = require('./models/Items');
const Bids = require("./models/Bids");
const { Auction, AuctionParticipants, AuctionItems } = require('./models/Auctions');
const BidsRouter = require('./Routes/BidsRouter');
const Role = require('./models/Roles');
// const logger = require('./utils/Logger');
// const morgan = require("morgan")
// const morganFormat = ':method :url :status :response-time ms';

// app.use(morgan(morganFormat,
//   {
//     stream: {
//       write: (message) => {
//         const logObject = {
//           //   method: message.split(' ')[0],
//           //   url: message.split(' ')[1],
//           //   status: message.split(' ')[2],
//           //   responseTime: message.split(' ')[3],

//           // };
//           // logger.info(JSON.stringify(logObject));
//         }
//       }
//     }
//   }
// ));

const port = process.env.PORT || 7070;
app.get('/health-check', (req, res) => {
  res.send('Server is healty')
})
// Routes
app.use('/users', UsersRouter)
app.use('/auction', AuctionRouter)
app.use('/items', ItemsRouter)
app.use('/statics', StaticPageRouter)
app.use('/bids', BidsRouter)
//Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something bad happened!')
})
app.listen(port, async () => {
  sequelize.authenticate()
    .then(() => {
      console.log(`The database is connected`)
    }).catch((err) => {
      console.log(`something wrong in database connection ${err}`)
    })
  sequelize
    .sync({ force: false, logging: console.log })
    .then((result) => {
      console.log("All the models are synced")
    }).catch((err) => {
      console.log(`something wrong in models sync ${err}`)
    })
  console.log(`server is running at ${port}`)
})
