const Article = require('../models/article')
const { NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

/**
 * @post    : Retrieves all articles
 * @route   : GET /api/v1/articles
 * @access  : public
 */
const getAllArticles = async (req, res) => {
    const articles = await Article.find()
    res.status(StatusCodes.OK).json({ articles })
}

/**
 * @post    : Creates an articles
 * @route   : POST /api/v1/articles
 * @access  : private
 */
const createArticle = async (req, res) => {
    const article = await Article.create(req.body)
    res.status(StatusCodes.CREATED).json({ article })
}

/**
 * @post    : Retrieves single article
 * @route   : GET /api/v1/articles/:id
 * @access  : public
 */
const getArticle = async (req, res) => {
    const { id: articleID } = req.params
    const article = await Article.findOne({ _id: articleID })

    if (!article) {
        throw new NotFoundError(`No article with id: ${articleID}`)
    }

    res.status(StatusCodes.OK).json({ article })
}

/**
 * @post    : Deletes an article
 * @route   : GET /api/v1/articles
 * @access  : private
 */
const deleteArticle = async (req, res) => {
    const { id: articleID } = req.params
    const article = await Article.findOneAndDelete({ _id: articleID })

    if (!article) {
        throw new NotFoundError(`No article with id: ${articleID}`)
    }

    res.status(StatusCodes.OK).json({ article })
}

/**
 * @post    : Updates an article
 * @route   : GET /api/v1/articles/:id
 * @access  : private
 */
const updateArticle = async (req, res) => {
    const { id: articleID } = req.params
    const article = await Article.findOneAndUpdate(
        { _id: articleID },
        req.body,
        { new: true, runValidators: true }
    )

    if (!article) {
        throw new NotFoundError(`No article with id: ${articleID}`)
    }

    res.status(StatusCodes.OK).json({ article })
}

module.exports = {
    getAllArticles,
    createArticle,
    getArticle,
    updateArticle,
    deleteArticle,
}
