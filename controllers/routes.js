const axios = require('axios')
const { BadRequestError, UnauthenticatedError } = require('../errors')

/**
 * @post    : Serves the main landing page
 * @route   : GET /
 * @access  : public
 */
const getFeaturedArticlesPage = async (req, res) => {
    // Make a request to your API endpoint
    const response = await axios.get('http://localhost:5000/api/v1/articles')
    const { articles } = response.data

    // Sort the articles by date in descending order (newest to oldest)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date))

    // Take the first 9 articles
    const firstNineArticles = articles.slice(0, 12)

    // Render the index.ejs template and pass the sorted articles data
    res.render('index', { articles: firstNineArticles })
}

/**
 * @post    : Serves the articles page
 * @route   : GET /articles
 * @access  : public
 */
const getArticlesPage = async (req, res) => {
    // Make a request to API endpoint
    const response = await axios.get('http://localhost:5000/api/v1/articles')
    const { articles } = response.data

    // Sort the articles by date in descending order (newest to oldest)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date))

    // Render the index.ejs template and pass the articles data
    res.render('articles', { articles })
}

/**
 * @post    : Serves a single article page
 * @route   : GET /articles/:id
 * @access  : public
 */
const getSingleArticlePage = async (req, res) => {
    // Extract the article id from the request parameters
    const { id } = req.params
    const response = await axios.get('http://localhost:5000/api/v1/articles')
    const { articles } = response.data
    const article = articles.find((article) => article._id === id)

    // Render the article.ejs template and pass the article data minus the article with the id
    res.render('article', {
        articles: articles.filter((a) => a._id !== id),
        article,
    })
}

/**
 * @post    : Serves about page
 * @route   : GET /about
 * @access  : public
 */
const getAboutPage = async (req, res) => {
    const response = await axios.get('http://localhost:5000/api/v1/content')
    const [content] = response.data.content
    res.render('about', { content })
}

/**
 * @post    : Serves contact page
 * @route   : GET /contact
 * @access  : public
 */
const getContactPage = async (req, res) => {
    const response = await axios.get('http://localhost:5000/api/v1/content')
    const [content] = response.data.content
    res.render('contact', { content })
}

module.exports = {
    getFeaturedArticlesPage,
    getArticlesPage,
    getSingleArticlePage,
    getAboutPage,
    getContactPage,
}
