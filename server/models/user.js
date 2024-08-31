const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name : {
        type: 'string',
        required: true,
    },

    email : {
        type: 'string',
        required: true,
    },

    imageURL : {
        type: 'string',
        required: true,
    },

    user_id : {
        type: 'string',
        required: true,
    },

    email_verified : {
        type: 'boolean',
        required: true,
    },

    role : {
        type: 'string',
        required: true,
    },

    auth_time : {
        type: 'string',
        required: true,
    },
},
{timestamps: true}
);

module.exports = mongoose.model("user", UserSchema);