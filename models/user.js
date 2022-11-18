const {Schema, model} = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            uniquie: true,
            required: true,
            match: /.+\@.+\..+/
        },

        thought: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        
        friend: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);