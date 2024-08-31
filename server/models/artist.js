const mongoose = require('mongoose');

const artistSchema = mongoose.Schema(
    {
        name: {
            type: 'string',
            required: true,
        },

        imageURL: {
            type: 'string',
            required: true,
        },

        twitter: {
            type: 'string',
            required: true,
        },

        instagram: {
            type: 'string',
            required: true,
        },
    },
    {timestamps : true}
);

module.exports = mongoose.model("artist", artistSchema);