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

}

// export operations
module.exports = operations; 