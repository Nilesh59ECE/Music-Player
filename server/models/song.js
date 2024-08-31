const mongoose = require('mongoose');
const album = require('./album');
const artist = require('./artist');

const songSchema = mongoose.Schema(
    {
        name: {
            type: 'string',
            required: true,
        },

        imageURL: {
            type: 'string',
            required: true,
        },

        songURL: {
            type: 'string',
            required: true,
        },

        album: {
            type: 'string',
        },

        artist:{
            type: 'string',
            required: true,
        },

        language: {
            type: 'string',
            required: true,
        },
        
        category: {
            type: 'string',
            required: true,
        },
    },
    {timestamps : true}
);

module.exports = mongoose.model("song", songSchema);