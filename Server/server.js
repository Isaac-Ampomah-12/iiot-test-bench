// import express
const express = require('express');
const app = express();

// import routers
const connectRouter = require('./routes/connect');
const pubSubRouter = require('./routes/pubSub');
const testPubSubRouter = require('./routes/testPubSub');

// handle cors
const cors = require("cors");
app.use(
  cors({
    origin: "*"

  })
)

// set port to listen on
const port = process.env.PORT || 8080;

// parse the incoming requests with JSON payloads
app.use(express.json());

// reference and use routers 
app.use('/broker', connectRouter);
app.use('/pubsub', pubSubRouter);
app.use('/test', testPubSubRouter);

// set the port the server to listin on
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
 });

 // export app
 module.exports = app;