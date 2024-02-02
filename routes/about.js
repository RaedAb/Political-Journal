const express = require('express')
const router = express.Router()
const path = require('path')

// GET /about route
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/about.html'))
})

module.exports = router