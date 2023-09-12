const express = require('express')
const app = express()

//cors setup
const cors = require("cors");
app.use(cors())

//body parser configutation
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//required files fetching
const gomuko = require('./gomuko');

app.post('/mark-cell', (req, res) => {
  const { row, col } = req.body;
  res.status(200).json(gomuko.playerMove(row, col));
});

app.post('/playerOrder', (req, res) => {
  const { choice } = req.body;
  res.status(200).json(gomuko.initiate(choice));
})

app.get('/flush', (req, res) => {
  var board = gomuko.flushBoard()
  res.status(200).json({ message: 'Board Flushed', board: board });
})

//PORT and SERVER starting configuration
const PORT = 8080
app.listen(PORT, () => { console.log(`Server is running at port ${PORT}`) })
