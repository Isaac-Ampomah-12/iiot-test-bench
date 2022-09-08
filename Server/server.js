
const express = require('express');
const app = express();
const connectRouter = require('./routes/connect');

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


// the server will be listening on port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
 });

 