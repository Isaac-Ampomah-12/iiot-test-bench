// import express
const express = require('express');

// import libraries
var mqtt = require('mqtt')
var usage = require('cpu-percentage');

// import helper functions
let operations = require('../operations/operations');

// create a router
const pubSubRouter = express.Router();

let numTopic = 0;
let result = {};
let topicArray = [];

let totalSubMemory = 0;
let totalPubMemory = 0;

let subscriptionInformation = {};
let publishInformation = {};

let totalSubUsage = 0;
let totalPubUsage = 0;


pubSubRouter.post('', (req, res) => {
    let userValues = req.body;

    // retreive broker connection credentials from process.env
    let pubSubOptions = {};
    pubSubOptions.host = process.env.host;
    pubSubOptions.port = process.env.port;
    pubSubOptions.protocol = process.env.protocol;
    pubSubOptions.username = process.env.username;
    pubSubOptions.password = process.env.password;

    // connect to broker
    let pubSubClient = mqtt.connect(pubSubOptions);

    pubSubClient.on("error", (error) => {
        // this variable will hold a false value 
        result.connected = pubSubClient.connected;
        // a false value will be sent to the front end
        res.send(result);
        pubSubClient.end();

    });
    // this block will be called if connection to broker is successfull
    pubSubClient.on('connect', function () {
        // this will store boolean value of true
        result.connected = pubSubClient.connected;

        // convert the message size the user passed from kilobyte to byte
        let numMessageByte = operations.convertKbToByte(userValues.messageSize);
    
        // generate a random message whose size is equal to the message size the user passed
        let message = operations.generateMessage(numMessageByte);

        // assign numTopic to the greater value among numberOfSubscribers and numberOfPublishers
        // if numberOfSubscribers is equal to numberOfPublishers assign numberOfPublishers to numTopic 
        if (userValues.numberOfSubscribers > userValues.numberOfPublishers){
            numTopic = userValues.numberOfSubscribers
        }else {
            numTopic = userValues.numberOfPublishers;
        }
            
        // generate random topics numTopic number of times
        for (let i=0; i < numTopic; i++){
            // generate a topic whose topic level is equal to publishTopicLevel
            let pubTopic = operations.generateTopic(userValues.publishTopicLevel+1);

            // add the topic to topicArray
            topicArray.push(pubTopic);

        }

        // this block will be called if the topic's level matches subscription topic level
        if (userValues.publishTopicLevel === userValues.subscriptionTopicLevel){
            
            // subscribe to the topics on topicArray whose indeces are below numberOfSubscribers
            for (let s=0; s<userValues.numberOfSubscribers; s++){
                let stopic = topicArray[s];

                // get the initial CPU usage before subscribing
                let subStart = usage();

                let now = Date.now();
                while(Date.now() - now < 500){
                    pubSubClient.subscribe(stopic);
                }
                
                // get the amount of CPU used by the subscription process
                let subUsage = usage(subStart);

                // get the amount of memory used by the subscription process
                let curSubMem = process.memoryUsage().heapUsed / 1024 / 1024;

                // store the total percentage of CPU used by all the subscription processes
                totalSubUsage += subUsage.percent; 

                // store total amount of memory used by all the subscription process
                totalSubMemory += curSubMem;
            }        
        }
 
        // set the interval at which publishes are made
        let pubLoop = setInterval(() => {

            // sets the number of publishes to make
            for(let p=0; p < userValues.numberOfPublishers; p++){
                // get topics from topicArray
                let ptopic = topicArray[p];

                // get the initial CPU usage before publising
                let pubStart = usage();

                // wait for wait for publishing to complete
                let now = Date.now();
                while(Date.now() - now < 500){
                    // publish message to topic
                    pubSubClient.publish(ptopic, message);
                }

                // get the amount of CPU used by the publishing process
                let pubUsage = usage(pubStart);

                // store the total percentage of CPU used by all the publishing processes
                totalPubUsage += pubUsage.percent; 

                // get the amount of memory used for publishing to a topic
                let curPubMem = process.memoryUsage().heapUsed / 1024 / 1024;

                // store total amount of memory used by  all the publishing process
                totalPubMemory += curPubMem; 

                // this block will be called when the final publish is done
                if (p === userValues.numberOfPublishers - 1){

                    // stops interval
                    clearInterval(pubLoop);

                    
                    // get an average CPU percentage for all the subscription processes
                    let subCpuPercent = Math.round(totalSubUsage / userValues.numberOfSubscribers);

                    // get an average CPU percentage for all the publishing processes
                    let pubCpuPercent = Math.round(totalPubUsage / userValues.numberOfPublishers);

                    // append the subscription memory and CPU Usage percentage
                    subscriptionInformation.cpu = subCpuPercent + "%";
                    subscriptionInformation.memory = Math.floor(totalSubMemory) + " MB";

                    // append the publish memory and CPU Usage percentage
                    publishInformation.cpu = pubCpuPercent + "%";
                    publishInformation.memory = Math.floor(totalPubMemory) + " MB";

                    // append subscriptionInformation and publishInformation objects to result object
                    result.subscriptionInformation = subscriptionInformation;
                    result.publishInformation = publishInformation;

                    // empty topicArray
                    topicArray = [];

                    // send result object to front end
                    res.send(result);

                    pubSubClient.end();
                }
            }
                
        }, userValues.publishInterval); 
        
    });

    
    
});

// export router
module.exports = pubSubRouter;
