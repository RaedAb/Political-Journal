const Article = require('../models/Article')

/**
 * @post    : Retrieves all articles
 * @route   : GET /api/v1/articles 
 * @access  : public
 */
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find()
        res.status(200).json({ articles })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

/**
 * @post    : Creates an articles
 * @route   : POST /api/v1/articles 
 * @access  : private
 */
const createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body)
        res.status(201).json({ article })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
}

/**
 * @post    : Retrieves single article
 * @route   : GET /api/v1/articles/:id
 * @access  : public
 */
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

/**
 * @post    : Deletes an article
 * @route   : GET /api/v1/articles 
 * @access  : private
 */
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

/**
 * @post    : Updates an article
 * @route   : GET /api/v1/articles/:id
 * @access  : private
 */
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
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllArticles,
    createArticle,
    getArticle,
    updateArticle,
    deleteArticle,
}
