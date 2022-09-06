// import express
const express = require('express');

// import mqtt library
var mqtt = require('mqtt')

// create a router
const connectRouter = express.Router();

// this will handle broker connetion request
connectRouter.post('/connect',(req, res) => {
    var options = req.body;

    // connect to broker
    gloClient = mqtt.connect(options);

    // this section will run if connection is successful 
    gloClient.on('connect', () => {
        // this will return the boolean value true
        let connectionStatus = gloClient.connected;
       
        // send true to the front end
        res.send({connectionStatus});
    });

    // this section will run if connection is unsuccessful
    gloClient.on('error', (error) => {
        // this will return the boolean value false
        connectionStatus = gloClient.connected;

        //send false to the front end
        res.send({connectionStatus});
    });   
   
});

// this will export the connectRouter
module.exports = connectRouter;