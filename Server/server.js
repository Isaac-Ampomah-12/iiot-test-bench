const express = require('express');
const app = express();
const mqtt = require('mqtt');
var randomWords = require('random-words');

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

app.post("/pubsub", (req, res) => {
    let {options, publishValues} = req.body;
    var client = mqtt.connect(options);
    
    let words = randomWords(publishValues.publishTopicLevel);
    let topic = words.join('/');

    console.log(client.connected);
    // setup the callbacks
    client.on('connect', function () {
        console.log('Connected');
    });

    client.on('error', function (error) {
        console.log(error);
    });

    client.on('message', function (topic, message) {
        // called each time a message is received
        console.log('Received message:', topic, message.toString());
        res.send("passed");
    });

    // subscribe to topic 'my/test/topic'
    client.subscribe(topic);

    // publish message 'Hello' to topic 'my/test/topic'
    client.publish(topic, "hi");
});


// the server will be listening on port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
 });


 module.exports = app;
 