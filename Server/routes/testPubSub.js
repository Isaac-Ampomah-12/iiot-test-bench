// import express
const express = require('express');

// import mqtt library
var mqtt = require('mqtt')

// create a router
const testSubPubRouter = express.Router();

// this object will hold the topic and message a subscriber receives
let received = {};

testSubPubRouter.post('/subpub', (req, res) => {
  let userValues = req.body;

  // retreive broker connection credentials from process.env
  let subPubOptions = {};
  subPubOptions.host = process.env.host;
  subPubOptions.port = process.env.port;
  subPubOptions.protocol = process.env.protocol;
  subPubOptions.username = process.env.username;
  subPubOptions.password = process.env.password;

  // connect to broker
  let subPub = mqtt.connect(subPubOptions);

  subPub.on("error", function () {
    console.log("TestPubSub", received.connected);
    subPub.end();
  });

  // this block will be called when the subscriber receives a message
  subPub.on("message", function (topic, message) {
    // store topic and message into received object
    received.topic = topic;
    received.message = message.toString();

    // send the received topic and message as response to the front end
    res.send(received);
  });

  // this block will be called if connection to broker is successfull
  subPub.on("connect", function () {
    // this will store boolean value of true
    received.connected = subPub.connected;
    
    console.log('TestPubSub', received.connected);
    // subscribe to topic
    subPub.subscribe(userValues.publishTopic);

    // publish to topic
    subPub.publish(userValues.publishTopic, userValues.publishMessage);
  });
});

// export router
module.exports = testSubPubRouter;
