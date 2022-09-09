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

    // Generate Random topic based on the topic level
    let topic = operations.generateTopic(userValues.publishTopicLevel);

    // generate random message

    // let randomNumber = Math.random()*1000;
    // let message = randomNumber.toString();

    // generate a random message of size of size 
    let numMessageByte = operations.convertKbToByte(userValues.messageSize);
    console.log("ByteValue: " + numMessageByte);
    let message = operations.generateMessage(numMessageByte);
    // let messageSize = operations.getMessageSize(message);
    // console.log(message);
    // console.log(messageSize);



    

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
        let receivedMessageSize = operations.getMessageSize(message);

        // check the size of the received message
        subscriptionInformation.receivedMessageSize = receivedMessageSize;

        // keep received subscribed topic's message 
        subscriptionInformation.topic = topic;
        subscriptionInformation.message = message.toString();


        // append publishInformation and subscriptionInformation arrays to result array
        result.publishInformation = publishInformation;
        result.subscriptionInformation = subscriptionInformation;
        // console.log('Received message:', topic, message.toString());

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
            // check CPU usage before publishing to broker
            let subscribePreviousCpuUsage = process.cpuUsage();

            // spin the CPU for 500 milliseconds
            const subStartDate = Date.now();
            while (Date.now() - subStartDate < 500);

            // subscribe to topic
            pubSubClient.subscribe(topic);

            // check CPU usage after publishing to broker 
            const subscribeCurrentCpuUsage = process.cpuUsage(subscribePreviousCpuUsage);

            // check memory usage before publishing to broker
            let subscribeMemoryUsage = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024).toString() +"MB";

            // calculate the actual cpu percentage used by the subscription operation
            const subscribeActualCpuUsagePercentage = Math.floor(100 * (subscribeCurrentCpuUsage.user + subscribeCurrentCpuUsage.system) / ((Date.now() - subStartDate) * 1000)).toString() +"%";


            // check memory usage before publishing to broker
            // let publishPreviousMemoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;

            // check CPU usage before publishing to broker
            let publishPreviousCpuUsage = process.cpuUsage();
            
            // spin the CPU for 500 milliseconds
            const pubStartDate = Date.now();
            while (Date.now() - pubStartDate < 500);

            // publish to topic
            pubSubClient.publish(topic, message);

            // check CPU usage after publishing to broker 
            const publishCurrentCpuUsage = process.cpuUsage(publishPreviousCpuUsage);

            // check memory usage before publishing to broker
            let pubishMemoryUsage = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024).toString() +"MB";

            // calculate the actual cpu percentage used by the publish operation
            const publishActualCpuUsagePercentage = Math.floor(100 * (publishCurrentCpuUsage.user + publishCurrentCpuUsage.system) / ((Date.now() - pubStartDate) * 1000)).toString() +"%";
            



    
            // store subscription information
            subscriptionInformation.numberOfSubscriptionsExceeded = false;
            subscriptionInformation.subscriptionCount = subscriptionCount;
            subscriptionInformation.subscribeMemoryUsage = subscribeMemoryUsage;
            subscriptionInformation.subscribeActualCpuUsagePercentage = subscribeActualCpuUsagePercentage;


            subscriptionCount ++;
    
            // publish information section
            publishInformation.numberOfPublishesExceeded = false;
            publishInformation.publishCount = publishCount;
            publishInformation.publishMemoryUsage = pubishMemoryUsage;
            publishInformation.publishCpuUsage = publishActualCpuUsagePercentage;
            publishInformation.topic = topic;
            publishInformation.message = message;

            publishCount++;

            lastNumberOfPublishers = userValues.numberOfPublishers;
            lastNumberOfSubscribers = userValues.numberOfSubscribers;
        }else {

            // check CPU usage before publishing to broker
            let publishPreviousCpuUsage = process.cpuUsage();

            // spin the CPU for 500 milliseconds
            const pubStartDate = Date.now();
            while (Date.now() - pubStartDate < 500);

            // publish to topic
            pubSubClient.publish(topic, message);

            // check CPU usage after publishing to broker 
            const publishCurrentCpuUsage = process.cpuUsage(publishPreviousCpuUsage);

            // check memory usage before publishing to broker
            let pubishMemoryUsage = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024).toString() +"MB";

            // calculate the actual cpu percentage used by the publish operation
            const publishActualCpuUsagePercentage = Math.floor(100 * (publishCurrentCpuUsage.user + publishCurrentCpuUsage.system) / ((Date.now() - pubStartDate) * 1000)).toString() +"%";
                        
            // store subscription information
            subscriptionInformation.numberOfSubscriptionsExceeded = false;
            subscriptionInformation.subscriptionCount = subscriptionCount;
            subscriptionInformation.subscribeMemoryUsage = "";
            subscriptionInformation.subscribeActualCpuUsagePercentage = "";
            subscriptionInformation.topic = "";
            subscriptionInformation.message = "";

            // publish information section
            publishInformation.numberOfPublishesExceeded = false;
            publishInformation.publishCount = publishCount;
            publishInformation.publishMemoryUsage = pubishMemoryUsage;
            publishInformation.publishCpuUsage = publishActualCpuUsagePercentage;
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

             // check CPU usage before publishing to broker
             let subscribePreviousCpuUsage = process.cpuUsage();

             // spin the CPU for 500 milliseconds
             const subStartDate = Date.now();
             while (Date.now() - subStartDate < 500);
 
             // subscribe to topic
             pubSubClient.subscribe(topic);
 
             // check CPU usage after publishing to broker 
             const subscribeCurrentCpuUsage = process.cpuUsage(subscribePreviousCpuUsage);
 
             // check memory usage before publishing to broker
             let subscribeMemoryUsage = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024).toString() +"MB";
 
             // calculate the actual cpu percentage used by the subscription operation
             const subscribeActualCpuUsagePercentage = Math.floor(100 * (subscribeCurrentCpuUsage.user + subscribeCurrentCpuUsage.system) / ((Date.now() - subStartDate) * 1000)).toString() +"%";

            // store subscription information
            subscriptionInformation.numberOfSubscriptionsExceeded = false;
            subscriptionInformation.subscriptionCount = subscriptionCount;
            subscriptionInformation.subscribeMemoryUsage = subscribeMemoryUsage;
            subscriptionInformation.subscribeActualCpuUsagePercentage = subscribeActualCpuUsagePercentage;
            subscriptionInformation.topic = topic;
            subscriptionInformation.message = "";

    
            result.subscriptionInformation = subscriptionInformation;
    
            subscriptionCount ++;

            lastNumberOfPublishers = userValues.numberOfPublishers;
            lastNumberOfSubscribers = userValues.numberOfSubscribers;

            res.send(result);


        }else{
            // store subscription information
            subscriptionInformation.numberOfSubscriptionsExceeded = false;
            subscriptionInformation.subscriptionCount = subscriptionCount;
            subscriptionInformation.subscribeMemoryUsage = "";
            subscriptionInformation.subscribeActualCpuUsagePercentage = "";
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

            // check CPU usage before publishing to broker
            let publishPreviousCpuUsage = process.cpuUsage();
            
            // spin the CPU for 500 milliseconds
            const pubStartDate = Date.now();
            while (Date.now() - pubStartDate < 500);

            // publish to topic
            pubSubClient.publish(topic, message);

            // check CPU usage after publishing to broker 
            const publishCurrentCpuUsage = process.cpuUsage(publishPreviousCpuUsage);

            // check memory usage before publishing to broker
            let pubishMemoryUsage = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024).toString() +"MB";

            // calculate the actual cpu percentage used by the publish operation
            const publishActualCpuUsagePercentage = Math.floor(100 * (publishCurrentCpuUsage.user + publishCurrentCpuUsage.system) / ((Date.now() - pubStartDate) * 1000)).toString() +"%";

            publishInformation.numberOfPublishesExceeded = false;
            publishInformation.publishCount = publishCount;
            publishInformation.publishMemoryUsage = pubishMemoryUsage;
            publishInformation.publishCpuUsage = publishActualCpuUsagePercentage;
            publishInformation.topic = topic;
            publishInformation.message = message;

            result.publishInformation = publishInformation;

            publishCount++;

            res.send(result);

        }else{

            // check CPU usage before publishing to broker
            let publishPreviousCpuUsage = process.cpuUsage();
            
            // spin the CPU for 500 milliseconds
            const pubStartDate = Date.now();
            while (Date.now() - pubStartDate < 500);

            // publish to topic
            pubSubClient.publish(topic, message);

            // check CPU usage after publishing to broker 
            const publishCurrentCpuUsage = process.cpuUsage(publishPreviousCpuUsage);

            // check memory usage before publishing to broker
            let pubishMemoryUsage = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024).toString() +"MB";

            // calculate the actual cpu percentage used by the publish operation
            const publishActualCpuUsagePercentage = Math.floor(100 * (publishCurrentCpuUsage.user + publishCurrentCpuUsage.system) / ((Date.now() - pubStartDate) * 1000)).toString() +"%";
            
            publishInformation.numberOfPublishesExceeded = false;
            publishInformation.publishCount = publishCount;
            publishInformation.publishMemoryUsage = pubishMemoryUsage;
            publishInformation.publishCpuUsage = publishActualCpuUsagePercentage;
            publishInformation.topic = topic;
            publishInformation.message = message;

            result.publishInformation = publishInformation;

            publishCount++;

            res.send(result);
        }

    }else{
        // this block will be run if both number of publisher and number of subscribers have been exceeded
        
        // store subscription information
        subscriptionInformation.numberOfSubscriptionsExceeded = true;
        // subscriptionInformation.subscriptionCount = subscriptionCount;
        subscriptionInformation.subscribeMemoryUsage = "";
        subscriptionInformation.subscribeActualCpuUsagePercentage = "";
        subscriptionInformation.topic = "";
        subscriptionInformation.message = "";

        result.subscriptionInformation = subscriptionInformation;

        // publish information section
        publishInformation.numberOfPublishesExceeded = true;
        publishInformation.publishMemoryUsage = "";
        publishInformation.publishCpuUsage = "";
        publishInformation.topic = "";
        publishInformation.message = "";

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
 