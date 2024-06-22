const express = require('express');
const app = express();
const cors = require('cors');
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
const logger = require('./utils/Logger');
const morgan = require("morgan");
const Logging = require('./utils/Logger');
const { Events, Logging_level, Entity } = require('./utils/LoggerParams');
//logger config
morgan.token('body', (req, res) => JSON.stringify(req.body));
const morganFormat = ':method :url :status :response-time ms - :body - :req[body] - :req[content-length] - :res[content-length] - :res[body]';
app.use(morgan(morganFormat));
// cors config
const corsOptions = {
  origin: 'http://127.0.0.1:5173', // Allow only requests from this origin
  // methods: 'GET,POST', // Allow only these methods
  // allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));
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
      Logging(Logging_level.info, Entity.Database, Events.CONNECTION, "database connection is sucessfullly")
    }).catch((err) => {
      Logging(Logging_level.error, Entity.Database, Events.CONNECTION, `database connection is failed ${err}`)

    })
  sequelize
    .sync({ force: false, logging: console.log })
    .then((result) => {
      Logging(Logging_level.info, Entity.Database, Events.CONNECTION, "database all the models are synced")
    }).catch((err) => {
      Logging(Logging_level.error, Entity.Database, Events.CONNECTION, `database models syncing failed ${err}`)
    })
  Logging(Logging_level.info, Entity.SERVER, Events.SERVER_ACTIVITIES, `server is running at ${port}`)
})
