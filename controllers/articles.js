const Article = require('../models/Article')

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find()
        res.status(200).json({ articles })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

const createArticle = async (req, res) => {
    const article = await Article.create(req.body)
    res.status(201).json({ article })
}

const getArticle = (req, res) => {
    res.send('get single article')
}

const updateArticle = (req, res) => {
    res.send('get a single article')
}

const deleteArticle = (req, res) => {
    res.send('delete article')
}

module.exports = {
    getAllArticles,
    createArticle,
    getArticle,
    updateArticle,
    deleteArticle,
}
