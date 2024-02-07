const express = require('express')
const router = express.Router()
const axios = require('axios')

/**
 * Serves the routes for all the pages and html files
 */

// GET / route (Root route)
router.get('/', async (req, res) => {
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
})

// GET /articles route
router.get('/articles', async (req, res) => {
    try {
        // Make a request to your API endpoint
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
})

// GET articles/:id
// GET /articles/:id route
router.get('/articles/:id', async (req, res) => {
    try {
        // Extract the article id from the request parameters
        const { id } = req.params

        // Make a request to API endpoint to fetch the article by id
        const response = await axios.get(
            `http://localhost:5000/api/v1/articles/${id}`
        )
        const { article } = response.data // Extracting article directly

        // Render the article.ejs template and pass the article data
        res.render('article', article)
    } catch (error) {
        console.log(error)
        console.error('Error fetching article:', error.message)
        res.status(500).send('Internal Server Error')
    }
})

// GET /about route
router.get('/about', (req, res) => {
    res.render('about')
})

// GET /contact route
router.get('/contact', (req, res) => {
    res.render('contact')
})

module.exports = router
