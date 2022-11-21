const {Schema, model} = require('mongoose');
const thoughtSchema = require('./Thought');

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

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        
        friends: [
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

const User = model('User', userSchema);
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

module.exports = User;
