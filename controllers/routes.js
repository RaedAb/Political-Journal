const axios = require('axios')

/**
 * @post    : Serves the main landing page
 * @route   : GET /
 * @access  : public
 */
const getFeaturedArticlesPage = async (req, res) => {
    try {
        // Make a request to your API endpoint
        const response = await axios.get(
            'http://localhost:5000/api/v1/articles'
        )
        const { articles } = response.data

        // Sort the articles by date in descending order (newest to oldest)
        articles.sort((a, b) => new Date(b.date) - new Date(a.date))

        // Take the first 9 articles
        const firstNineArticles = articles.slice(0, 12)

        // Render the index.ejs template and pass the sorted articles data
        res.render('index', { articles: firstNineArticles })
    } catch (error) {
        console.log(error)
        console.error('Error fetching articles:', error.message)
        res.status(500).send('Internal Server Error')
    }
}

/**
 * @post    : Serves the articles page
 * @route   : GET /articles 
 * @access  : public
 */
const getArticlesPage = async (req, res) => {
    try {
        // Make a request to API endpoint
        const response = await axios.get(
            'http://localhost:5000/api/v1/articles'
        )
        const { articles } = response.data

        // Sort the articles by date in descending order (newest to oldest)
        articles.sort((a, b) => new Date(b.date) - new Date(a.date))

        // Render the index.ejs template and pass the articles data
        res.render('articles', { articles })
    } catch (error) {
        console.log(error)
        console.error('Error fetching articles:', error.message)
        res.status(500).send('Internal Server Error')
    }
}

/**
 * @post    : Serves a single article page
 * @route   : GET /articles/:id
 * @access  : public
 */
const getSingleArticlePage = async (req, res) => {
    try {
        // Extract the article id from the request parameters
        const { id } = req.params
        const response = await axios.get(
            'http://localhost:5000/api/v1/articles'
        )
        const { articles } = response.data
        const article = articles.find((article) => article._id === id)

        // Render the article.ejs template and pass the article data minus the article with the id
        res.render('article', {
            articles: articles.filter((a) => a._id !== id),
            article,
        })
    } catch (error) {
        console.log(error)
        console.error('Error fetching article:', error.message)
        res.status(500).send('Internal Server Error')
    }
}

/**
 * @post    : Serves about page
 * @route   : GET /about
 * @access  : public
 */
const getAboutPage = (req, res) => {
    res.render('about')
}

/**
 * @post    : Serves contact page
 * @route   : GET /contact
 * @access  : public
 */
const getContactPage = (req, res) => {
    res.render('contact')
}

module.exports = {
    getFeaturedArticlesPage,
    getArticlesPage,
    getSingleArticlePage,
    getAboutPage,
    getContactPage,
}
