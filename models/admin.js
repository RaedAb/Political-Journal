const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, email: {
        type: String,
        required: false,
    }
})

AdminSchema.methods

module.exports = mongoose.model('Admin', AdminSchema)
