const express = require('express')
const router = express.Router()
const {
    getFeaturedArticlesPage,
    getArticlesPage,
    getSingleArticlePage,
    getAboutPage,
    getContactPage,
} = require('../controllers/routes')

/**
 * Serves the routes for all the pages and html files
 */
// GET / route (Root route)
router.get('/', getFeaturedArticlesPage)

// GET /articles route
router.get('/articles', getArticlesPage)

// GET articles/:id
router.get('/articles/:id', getSingleArticlePage)

// GET /about route
router.get('/about', getAboutPage)

// GET /contact route
router.get('/contact', getContactPage)

module.exports = router
