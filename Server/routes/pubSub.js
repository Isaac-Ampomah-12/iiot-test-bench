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

let subTotalElapTimeMs = 0;
let subTotalElapUserMs = 0;
let subTotalElapSystMs = 0;

let pubTotalElapTimeMs = 0;
let pubTotalElapUserMs = 0;
let pubTotalElapSystMs = 0;

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

                let startTime = process.hrtime();
                let startUsage = process.cpuUsage();

                let now = Date.now();
                while(Date.now() - now < 500){
                    pubSubClient.subscribe(stopic);
                }

                let elapTime = process.hrtime(startTime);
                let elapUsage = process.cpuUsage(startUsage);

                let curSubMem = process.memoryUsage().heapUsed / 1024 / 1024;

                let elapTimeMs = operations.Sec2ms(elapTime);
                let elapUserMs = operations.Sec2ms(elapUsage.user);
                let elapSystMs = operations.Sec2ms(elapUsage.system);

                subTotalElapTimeMs += elapTimeMs;
                subTotalElapUserMs += elapUserMs;
                subTotalElapSystMs += elapSystMs;

                
                totalSubMemory += curSubMem;
            }        
        }
 
        // set the interval at which publishes are made
        let pubLoop = setInterval(() => {

            // sets the number of publishes to make
            for(let p=0; p < userValues.numberOfPublishers; p++){
                // get topics from topicArray
                let ptopic = topicArray[p];

                // get the time and Cpu Usage before publishing
                let startTime = process.hrtime();
                let startUsage = process.cpuUsage();

                // wait for wait for publishing to complete
                let now = Date.now();
                while(Date.now() - now < 500){
                    // publish message to topic
                    pubSubClient.publish(ptopic, message);
                }

                // get the time and cpu Usage 
                let elapTime = process.hrtime(startTime);
                let elapUsage = process.cpuUsage(startUsage);

                let elapTimeMs = operations.Sec2ms(elapTime);
                let elapUserMs = operations.Sec2ms(elapUsage.user);
                let elapSystMs = operations.Sec2ms(elapUsage.system);

                pubTotalElapTimeMs += elapTimeMs;
                pubTotalElapUserMs += elapUserMs;
                pubTotalElapSystMs += elapSystMs;

                

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

                    let subCpuPercent = Math.round(100 * (subTotalElapUserMs + subTotalElapSystMs) / subTotalElapTimeMs);
                    console.log("cpu Percent " , subCpuPercent);


                    let pubCpuPercent = Math.round(100 * (pubTotalElapUserMs + pubTotalElapSystMs) / pubTotalElapTimeMs);
                    console.log("cpu Percent " , pubCpuPercent);
                    // console.log("Fin Sub " + totalCpuPercent / userValues.numberOfSubscribers);

                    // store total CPU and memory used for subscription into subscriptionInformation
                    // subscriptionInformation.cpu = Math.floor(totalSubCpu / userValues.numberOfSubscribers) + "%";
                    subscriptionInformation.cpu = subCpuPercent + "%";
                    subscriptionInformation.memory = Math.floor(totalSubMemory) + " MB";


                    // store total CPU and memory used for publishing into publishInformation
                    // publishInformation.cpu = Math.floor(totalPubCpu / userValues.numberOfPublishers) + "%";
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
