const express = require('express');
const AuctionRouter = require('./Routes/AuctionRouter');
const UsersRouter = require('./Routes/UsersRouter');
const ItemsRouter = require('./Routes/ItemsRouter');
const StaticPageRouter = require('./Routes/StaticRouter');
const app = express();
const port = process.env.PORT || 9000;
app.get('/health-check', (req, res) => {
  res.send('Server is healty')
})

// Routes
app.use('/users', UsersRouter)
app.use('/auction', AuctionRouter)
app.use('/items', ItemsRouter)
app.use('/statics', StaticPageRouter)
// //Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something bad happened!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})