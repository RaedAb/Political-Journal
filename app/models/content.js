const mongoose = require('mongoose')

const ContentSchema = new mongoose.Schema({
    about: {
        type: String,
        required: [true, 'must provide about us'],
        trim: true,
    },
    contact: {
        type: String,
        required: [true, 'must provide contact contents'],
        trim: true,
    },
})

module.exports = mongoose.model('Content', ContentSchema)
