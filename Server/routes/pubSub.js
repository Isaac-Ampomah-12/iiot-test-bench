// import express
const express = require('express');

// import libraries
var mqtt = require('mqtt')
const os = require("node-os-utils");
require("loadavg-windows");

// import helper functions
let operations = require('../operations/operations');

// create a router
const pubSubRouter = express.Router();

let numTopic = 0;
let result = {};
let topicArray = [];
let pubCount = 0;

let totalSubMemory = 0;
let totalPubMemory = 0;

let totalSubCpu = 0;
let totalPubCpu = 0;
let subscriptionInformation = {};
let publishInformation = {};

let cpu = os.cpu;

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

                pubSubClient.subscribe(stopic);

                // get the amount of CPU used for subscribing to a topic
                let curSubCpu = (cpu.loadavgTime() / 2) * 10;

                // get the amount of memory used for subscribing to a topic
                let curSubMem = process.memoryUsage().heapUsed / 1024 / 1024;

                // store accumulated amount of CPU used for subscribing to the set of topics
                totalSubCpu += curSubCpu;

                // store accumulated amount of memory used for subscribing to the set of topics
                totalSubMemory += curSubMem;
            }        
        }
 
        // set the interval at which publishes are made
        let pubLoop = setInterval(() => {

            // sets the number of publishes to make
            for(let p=0; p < userValues.numberOfPublishers; p++){
                // get topics from topicArray
                let ptopic = topicArray[p];

                // publish message to topic
                pubSubClient.publish(ptopic, message);
                
                // get the amount of CPU used for publishing to a topic
                let curPubCpu = (cpu.loadavgTime() / 2) * 10;

                // get the amount of memory used for publishing to a topic
                let curPubMem = process.memoryUsage().heapUsed / 1024 / 1024;

                // store accumulated amount of CPU used for publishing to the set of topics
                totalPubCpu += curPubCpu;

                // store accumulated amount of memory used for publishing to the set of topics
                totalPubMemory += curPubMem; 

                // this block will be called when the final publish is done
                if (p === userValues.numberOfPublishers - 1){

                    // stops interval
                    clearInterval(pubLoop);

                    // store total CPU and memory used for subscription into subscriptionInformation
                    subscriptionInformation.cpu = Math.floor(totalSubCpu / userValues.numberOfSubscribers) + "%";
                    subscriptionInformation.memory = Math.floor(totalSubMemory) + " MB";

                    // store total CPU and memory used for publishing into publishInformation
                    publishInformation.cpu = Math.floor(totalPubCpu / userValues.numberOfPublishers) + "%";
                    publishInformation.memory = Math.floor(totalPubMemory) + " MB";

                    // append subscriptionInformation and publishInformation objects to result object
                    result.subscriptionInformation = subscriptionInformation;
                    result.publishInformation = publishInformation;

                    // empty topicArray
                    topicArray = [];

                    // send result object to front end
                    res.send(result);
                }
            }
                
        }, userValues.publishInterval); 
        
    });

    pubSubClient.on("error", (error) => {
        // this variable will hold a false value 
        result.connected = pubSubClient.connected;
        // a false value will be sent to the front end
        res.send(result);
    });
});

// export router
module.exports = pubSubRouter;
