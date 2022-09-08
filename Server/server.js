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


let publishCount = 1;
let subscriptionCount = 1;

let lastNumberOfPublishers = 0;
let lastNumberOfSubscribers = 0;

result = {};

let subscriptionInformation = {};
let publishInformation = {}

app.post("/pubsub", (req, res) => {
    let {options, userValues} = req.body;
    var pubSubClient = mqtt.connect(options);
    
    if (lastNumberOfSubscribers !== userValues.numberOfSubscribers){
        subscriptionCount = 1;
    }
    
    if (lastNumberOfPublishers !== userValues.numberOfPublishers){
        publishCount = 1;
    }

    // Generate Random topic
    let words = randomWords(userValues.publishTopicLevel);
    let topic = words.join('/');

    // setup the callbacks
    pubSubClient.on('connect', function () {
        console.log('Connected');
    });

    pubSubClient.on('error', function (error) {
        console.log(error);
    });

    pubSubClient.on('message', function (topic, message) {
        // called each time a message is received

        userValues.publishCount;
        userValues.subscriptionCount

        result.publishInformation = publishInformation;
        result.subscriptionInformation = subscriptionInformation;
        console.log('Received message:', topic, message.toString());

        // keep record of the last number of publishers and subscribers
        lastNumberOfPublishers = userValues.numberOfPublishers;
        lastNumberOfSubscribers = userValues.numberOfSubscribers;

        res.send(result);
    });

    // both 
    if(subscriptionCount <= userValues.numberOfSubscribers && publishCount <= userValues.numberOfPublishers){
        // subscribe to topic
        pubSubClient.subscribe(topic);

        // publish to topic
        pubSubClient.publish(topic, "hi");

        // subscription information ection
        subscriptionInformation.numberOfSubscriptionsExceeded = false;
        subscriptionInformation.subscriptionCount = subscriptionCount;
        subscriptionCount ++;

        // publish information section
        publishInformation.numberOfPublishesExceeded = false;
        publishInformation.publishCount = publishCount;
        publishCount++;
    }
    else if(subscriptionCount <= userValues.numberOfSubscribers && publishCount >= userValues.numberOfPublishers){
        pubSubClient.subscribe(topic);

        // subscription information ection
        subscriptionInformation.numberOfSubscriptionsExceeded = false;
        subscriptionInformation.subscriptionCount = subscriptionCount;
        subscriptionCount ++;

        // publish information section
        publishInformation.numberOfPublishesExceeded = true;
        publishInformation.publishCount = publishCount;

        // keep record of the last number of publishers and subscribers
        lastNumberOfPublishers = userValues.numberOfPublishers;
        lastNumberOfSubscribers = userValues.numberOfSubscribers;

        res.send(result);

    }
    else if(subscriptionCount >= userValues.numberOfSubscribers && publishCount <= userValues.numberOfPublishers){
        pubSubClient.publish(topic, "hi");

        // subscription information ection
        subscriptionInformation.numberOfSubscriptionsExceeded = true;
        subscriptionInformation.subscriptionCount = subscriptionCount;

        // publish information section
        publishInformation.numberOfPublishesExceeded = false;
        publishInformation.publishCount = publishCount;
        publishCount++;

        // keep record of the last number of publishers and subscribers
        lastNumberOfPublishers = userValues.numberOfPublishers;
        lastNumberOfSubscribers = userValues.numberOfSubscribers;

        res.send(result);

    }
    else{
        
        publishInformation.numberOfPublishesExceeded = true;
        result.publishInformation = publishInformation;

        subscriptionInformation.numberOfSubscriptionsExceeded = true;
        result.subscriptionInformation = subscriptionInformation;

        // keep record of the last number of publishers and subscribers
        lastNumberOfPublishers = userValues.numberOfPublishers;
        lastNumberOfSubscribers = userValues.numberOfSubscribers;

        res.send(result);
    }
    
});



// the server will be listening on port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
 });


 module.exports = app;
 