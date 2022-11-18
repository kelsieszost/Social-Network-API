const {Schema, model} = require('mongoose');
const thoughtSchema = require('./thought');

const userSchema = new Schema (
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
            match: [
                /.+\@.+\..+/
            ],
        },

        thought: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        
        friend: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
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