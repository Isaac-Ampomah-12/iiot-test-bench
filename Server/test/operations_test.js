// import chai
const chai = require('chai');

// access the assert in chai
const assert = chai.assert;

// import operations object from operations.js
const operations = require("../operations/operations");

// this will test methods that do generation operations
describe('Generate', () => {

    // this will test the generateTopic method
    it('topic', () => {
        // argument passed to method
        let argument = 5; 

        // call generateTopic
        let topic = operations.generateTopic(argument);

        // do assertions
        assert.isNotNull(topic);
        assert.isString(topic);
    });

    // this will test the generateMessage method
    it("message", () => {
        // argument
        let argument = 200;

        // call generateMessage
        let message = operations.generateMessage(argument);

        // do assertions
        assert.isNotNull(message);
        assert.isString(message);
    });
});

// this will test methods that do get operations
describe('Get', () => {

    // this will test the getMessageSize method
    it("message size in kilobytes", () => {
        // input
        let message = "Hello world";
        
        // call getMessageSize
        let msgSize = operations.getMessageSize(message);

        // do assertions
        assert.isNotNull(msgSize);
        assert.isNumber(msgSize);
    });
    
});

// this will test methods that do convertion operations
describe('Convert', () => {

    // this will test the convertKbToByte method
    it("kilobytes to bytes", () => {
        // input
        let kiloVal = 20;

        //call convertKbToByte
        let byteVal = operations.convertKbToByte(kiloVal);

        // do assertions
        assert.isNotNull(byteVal);
        assert.isNumber(byteVal);
    });

});

