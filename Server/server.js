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


// initialize publish and subscription counts
let publishCount = 1;
let subscriptionCount = 1;

// initialize lastNumberOfPublishers and lastNumberOfSubscribers
let lastNumberOfPublishers = 0;
let lastNumberOfSubscribers = 0;

// initialize result object
result = {};

let subscriptionInformation = {};
let publishInformation = {}

app.post("/pubsub", (req, res) => {
    let {options, userValues} = req.body;

    // attempt connecting to broker
    let pubSubClient = mqtt.connect(options);
    
    // reset subscriptionCount if user changes numberOfSubscribers
    if (lastNumberOfSubscribers !== userValues.numberOfSubscribers){
        subscriptionCount = 1;
    }
    
    // reset publishCount if user changes numberOfPublishers
    if (lastNumberOfPublishers !== userValues.numberOfPublishers){
        publishCount = 1;
    }

    // Generate Random topic
    let words = randomWords(userValues.publishTopicLevel);
    let topic = words.join('/');

    // generate random message
    let randomNumber = Math.random()*1000;
    let message = randomNumber.toString();

    pubSubClient.on('connect', function () {
        // this block will be called if connection to broker is successfull
        console.log('Connected');
    });

    pubSubClient.on('error', function (error) {
        // this block will be called if connection to broker is unsuccessfull
        console.log(error);
    });

    pubSubClient.on('message', function (topic, message) {
        // called each time a message is received

        // userValues.publishCount;
        // userValues.subscriptionCount

        // keep received subscribed topic's message 
        subscriptionInformation.topic = topic;
        subscriptionInformation.message = message.toString();

        // append publishInformation and subscriptionInformation arrays to result array
        result.publishInformation = publishInformation;
        result.subscriptionInformation = subscriptionInformation;
        console.log('Received message:', topic, message.toString());

        // keep record of the last number of publishers and subscribers
        lastNumberOfPublishers = userValues.numberOfPublishers;
        lastNumberOfSubscribers = userValues.numberOfSubscribers;

        // send result object to client
        res.send(result);
    });

    
    if(subscriptionCount <= userValues.numberOfSubscribers && publishCount <= userValues.numberOfPublishers){
        // this block will be run if both number of publisher and number of subscribers have not been exceeded

        // subscribe to topic
        if(userValues.publishTopicLevel === userValues.subscriptionTopicLevel){
            pubSubClient.subscribe(topic);
            
            // publish to topic
            pubSubClient.publish(topic, message);
    
            // subscription information ection
            subscriptionInformation.numberOfSubscriptionsExceeded = false;
            subscriptionInformation.subscriptionCount = subscriptionCount;
            subscriptionCount ++;
    
            // publish information section
            publishInformation.numberOfPublishesExceeded = false;
            publishInformation.publishCount = publishCount;
            publishInformation.topic = topic;
            publishInformation.message = message;
            publishCount++;

            lastNumberOfPublishers = userValues.numberOfPublishers;
            lastNumberOfSubscribers = userValues.numberOfSubscribers;
        }else {
            pubSubClient.publish(topic, message);
            
            subscriptionInformation.numberOfSubscriptionsExceeded = false;
            subscriptionInformation.subscriptionCount = subscriptionCount;
            subscriptionInformation.topic = "";
            subscriptionInformation.message = "";

            // publish information section
            publishInformation.numberOfPublishesExceeded = false;
            publishInformation.publishCount = publishCount;
            publishInformation.topic = topic;
            publishInformation.message = message;

            result.publishInformation = publishInformation;
            result.subscriptionInformation = subscriptionInformation;

            
            publishCount++;

            lastNumberOfPublishers = userValues.numberOfPublishers;
            lastNumberOfSubscribers = userValues.numberOfSubscribers;

            res.send(result);
        }


    }else if(subscriptionCount <= userValues.numberOfSubscribers && publishCount >= userValues.numberOfPublishers){
        // this block will be run if number of publisher have been exceeded but number of subscribers have not been exceeded
        if(userValues.publishTopicLevel === userValues.subscriptionTopicLevel){
            pubSubClient.subscribe(topic);
            subscriptionInformation.numberOfSubscriptionsExceeded = false;
            subscriptionInformation.subscriptionCount = subscriptionCount;
            subscriptionInformation.topic = topic;
            subscriptionInformation.message = "";

    
            result.subscriptionInformation = subscriptionInformation;
    
            subscriptionCount ++;

            lastNumberOfPublishers = userValues.numberOfPublishers;
            lastNumberOfSubscribers = userValues.numberOfSubscribers;

            res.send(result);


        }else{
            subscriptionInformation.numberOfSubscriptionsExceeded = false;
            subscriptionInformation.subscriptionCount = subscriptionCount;
            subscriptionInformation.topic = "";
            subscriptionInformation.message = "";

            result.subscriptionInformation = subscriptionInformation;

            lastNumberOfPublishers = userValues.numberOfPublishers;
            lastNumberOfSubscribers = userValues.numberOfSubscribers;

            res.send(result);
        }

    }else if(subscriptionCount >= userValues.numberOfSubscribers && publishCount <= userValues.numberOfPublishers){
        // this block will be run if number of publisher not been exceeded but number of subscribers have been exceeded
        if(userValues.publishTopicLevel === userValues.subscriptionTopicLevel){
            pubSubClient.publish(topic, message);
            publishInformation.numberOfPublishesExceeded = false;
            publishInformation.publishCount = publishCount;
            publishInformation.topic = topic;
            publishInformation.message = message;

            result.publishInformation = publishInformation;

            publishCount++;

            res.send(result);

        }else{
            pubSubClient.publish(topic, message);
            publishInformation.numberOfPublishesExceeded = false;
            publishInformation.publishCount = publishCount;
            publishInformation.topic = topic;
            publishInformation.message = message;

            result.publishInformation = publishInformation;

            publishCount++;

            res.send(result);
        }

        // add subscription data into subscriptionInformation object
        // subscriptionInformation.numberOfSubscriptionsExceeded = true;
        // subscriptionInformation.subscriptionCount = subscriptionCount;

        // add publish data into publishInformation object
        // publishInformation.numberOfPublishesExceeded = false;
        // publishInformation.publishCount = publishCount;
        // publishInformation.topic = topic;
        // publishInformation.message = message;

        // publishCount++;

        // // keep record of the last number of publishers and subscribers
        // lastNumberOfPublishers = userValues.numberOfPublishers;
        // lastNumberOfSubscribers = userValues.numberOfSubscribers;

        // // send result object to the front end
        // res.send(result);

    }else{
        // this block will be run if both number of publisher and number of subscribers have been exceeded
        
        // subscription information ection
        subscriptionInformation.numberOfSubscriptionsExceeded = true;
        result.subscriptionInformation = subscriptionInformation;

        // publish information section
        publishInformation.numberOfPublishesExceeded = true;
        publishInformation.topic = topic;
        publishInformation.message = message;
        result.publishInformation = publishInformation;
        

        // keep record of the last number of publishers and subscribers
        lastNumberOfPublishers = userValues.numberOfPublishers;
        lastNumberOfSubscribers = userValues.numberOfSubscribers;

        // send result object to the front end
        res.send(result);
    }
    

    // res.send(result);

    // publish message 'Hello' to topic 'my/test/topic'
    
});



// the server will be listening on port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
 });


 module.exports = app;
 