const mongoose = require('mongoose');

const albumSchema = mongoose.Schema(
    {
        name: {
            type: 'string',
            required: true,
        },

        imageURL: {
            type: 'string',
            required: true,
        },
    },
    {timestamps : true}
);

module.exports = mongoose.model("album", albumSchema);