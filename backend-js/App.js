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
const { Auction, AuctionParticipants } = require('./models/Auctions');
const BidsRouter = require('./Routes/BidsRouter');
const Role = require('./models/Roles');
const logger = require('./utils/Logger');
const morgan = require("morgan");
const Logging = require('./utils/Logger');
const { Events, Logging_level, Entity } = require('./utils/LoggerParams');
const Permission = require('./models/Permissions');
const ErrorHandler = require('./middleware/ErrorHnadlers');
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
app.use('/auctions', AuctionRouter)
app.use('/items', ItemsRouter)
app.use('/statics', StaticPageRouter)
app.use('/bids', BidsRouter)
//Global error handler
//Global error handler
app.use(ErrorHandler);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    Logging(Logging_level.info, Entity.Database, Events.CONNECTION, "database connection is successfully");
  } catch (e) {
    Logging(Logging_level.error, Entity.Database, Events.CONNECTION, "database connection failed " + e);
  }

  try {
    await sequelize.sync({ force: false, logging: console.log });
    Logging(Logging_level.info, Entity.Database, Events.CONNECTION, "models synced");
  } catch (err) {
    Logging(Logging_level.error, Entity.Database, Events.CONNECTION, "sync failed " + err);
  }

  Logging(Logging_level.info, Entity.SERVER, Events.SERVER_ACTIVITIES, `server running at ${port}`);
});
