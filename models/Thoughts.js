const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtsSchema = new Schema({
    thoughtsText: {
        type: String,
        required: true,
        //must be between 1 -280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    }
})

//NEED A REACTION SCHEMA