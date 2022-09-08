// import express
const express = require('express');

// import mqtt library
var mqtt = require('mqtt')

// create a router
const connectRouter = express.Router();

connectRouter.post('/connect',(req, res) => {
    let options = req.body;
    
    // attempts to connect to broker
    let brokerClient = mqtt.connect(options);

    // if the connection is successful this event will be triggered
    brokerClient.on("connect", () => {
        // this variable will hold true 
        let connectionStatus = brokerClient.connected

        // store broker connection credentials into process environment
        process.env.host = options.host;
        process.env.port = options.port;
        process.env.protocol = options.protocol;
        process.env.username = options.username;
        process.env.password = options.password;
        
        // a true value will be sent to the front end
        res.send({connectionStatus});
    });

    //if the connection is unsuccessful this event will be triggered
    brokerClient.on("error", (error) => {
        // this variable will hold a false value 
        let connectionStatus = brokerClient.connected;
        // a false value will be sent to the front end
        res.send({connectionStatus});
    });

});

// this will export the connectRouter
module.exports = connectRouter;