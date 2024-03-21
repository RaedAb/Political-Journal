const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'must provide a title'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'must provide a name'],
        trim: true,
    },
    date: { type: Date, default: Date.now },
    content: {
        type: String,
        required: [true, 'must provide content'],
        trim: true,
    },
    imageUrl: {
        type: String,
        required: [true, 'must provide an image'],
    },
})

module.exports = mongoose.model('Article', ArticleSchema)
