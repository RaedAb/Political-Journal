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
    try {
        const article = await Article.create(req.body)
        res.status(201).json({ article })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getArticle = async (req, res) => {
    try {
        const { id: articleID } = req.params
        const article = await Article.findOne({ _id: articleID })
        if (!article) {
            return res
                .status(404)
                .json({ msg: `No article with id: ${articleID}` })
        }

        res.status(200).json({ article })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteArticle = async (req, res) => {
    try {
        const { id: articleID } = req.params
        const article = await Article.findOneAndDelete({ _id: articleID })
        if (!article) {
            return res
                .status(404)
                .json({ msg: `No article with id: ${articleID}` })
        }

        res.status(200).json({ article })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateArticle = async (req, res) => {
    try {
        const { id: articleID } = req.params
        const article = await Article.findOneAndUpdate(
            { _id: articleID },
            req.body,
            { new: true, runValidators: true }
        )
        if (!article) {
            return res
                .status(404)
                .json({ msg: `No article with id: ${articleID}` })
        }

        res.status(200).json({ article })
    } catch (error) {}
}

module.exports = {
    getAllArticles,
    createArticle,
    getArticle,
    updateArticle,
    deleteArticle,
}
