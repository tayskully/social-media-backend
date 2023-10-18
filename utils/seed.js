const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    
})

const thoughtData = [
    {

    }
]
//get a user list 

///create a thought 

//add the thought to a random user

