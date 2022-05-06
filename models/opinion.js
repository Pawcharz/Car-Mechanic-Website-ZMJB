const mongoose = require('mongoose');

const opinionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    accepted: {
        type: Boolean,
        required: true
    }
}, { collection: "opinions" })

module.exports = mongoose.model('Opinion', opinionSchema);