const mongoose = require('mongoose');
const shortId = require('shortid');

// Define the schema using the Schema constructor
const shortUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required : true,
        default: shortId.generate
    },
    clicks: {
        type: Number
    }
})

// Create and export the ShortUrl model based on the schema

module.exports = mongoose.model('ShortURL', shortUrlSchema)
