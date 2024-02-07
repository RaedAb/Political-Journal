const express = require('express')
const router = express.Router()
const path = require('path')

/**
 * Serves the routes for all the pages and html files
 */

//GET / route
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../'))
})

// GET /about route
router.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/about.html'))
})

// GET /articles route
router.get('/articles', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/articles.html'))
})

// GET /contact route
router.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/contact.html'))
})

module.exports = router
