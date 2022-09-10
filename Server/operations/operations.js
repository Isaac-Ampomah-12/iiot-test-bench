// import random-words
var randomWords = require('random-words');

// this object will hold methods
const operations = {
    
    // this method will generate a random topic depending on the topic level the user sets
    generateTopic (topicLevel) {
        // create an array of random word and the array length is dependent on the topic level 
        let words = randomWords(topicLevel);
        
        // create a string of words seperated with "/"
        let topic = words.join('/');

        // return the topic created
        return topic
    },

    // this method will generate a random message depending on the message size the use sets
    generateMessage (num) {
        // create a string of repeating "#"
        let str = '#'.repeat(num);

        // return the string
        return str;
    },

    // this method will check the size of a message in kilobytes
    getMessageSize (str) {
        // get the string size in bytes
        let byteSize = Buffer.byteLength(str, "utf-8");

        // convert bytes value to kilobytes
        let kiloByteSize = Math.floor(byteSize * 0.001);

        // return kilobytes value
        return kiloByteSize;
    },
    
    // this method will convert kilobyte value to bytes
    convertKbToByte(kbValue){
        // multiply kilobyte value byte 1000 to get the byte value
        let byteValue = kbValue * 1000;

        // return the byte value
        return byteValue;
    }

}

// export operations
module.exports = operations; 