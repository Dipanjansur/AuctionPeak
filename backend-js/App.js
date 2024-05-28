const express = require('express')
const app = express();
const port = process.env.PORT || 9000;
app.get('/health-check', (req, res) => {
  res.send('Server is healty')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})