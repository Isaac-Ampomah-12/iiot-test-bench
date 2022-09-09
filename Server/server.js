const express = require('express');
const app = express();
const mqtt = require('mqtt');
var randomWords = require('random-words');
let operations = require('./operations/operations');

const connectRouter = require('./routes/connect');
const pubSubRouter = require('./routes/pubSub');

const cors = require("cors");
app.use(
  cors({
    origin: "*"

  })
)
// parse the incoming requests with JSON payloads 
app.use(express.json());

// set the port 
const port = process.env.PORT || 8080;

// routers
app.use('/broker', connectRouter);
app.use('/pubsub', pubSubRouter);

// the server will be listening on port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});


module.exports = app;
    