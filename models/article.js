const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: { type: Date, default: Date.now },
    content: String,
    imageUrl: String,
})

module.exports = mongoose.model('Article', ArticleSchema)
