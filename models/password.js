const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
    
}, { collection: "passwords" })

module.exports = mongoose.model('Password', passwordSchema);