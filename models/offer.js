const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    }
}, { collection: "offers" })

module.exports = mongoose.model('Offer', offerSchema);