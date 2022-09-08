// this object will hold methods
const operations = {

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