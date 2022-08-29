const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema ({
reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
}, 
reactionBody: {
    type: String,
    required: true,
    maxlength: 280
},
username: {
    type: String,
    required: true
},
createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
}
},
{
    toJSON: {
        getters: true
    },
    id: false
});

const ThoughtsSchema = new Schema({
    thoughtsText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    //telling the schema it can use virutals
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
    });

const Thought = model('Thoughts', ThoughtsSchema);

module.exports = Thought;