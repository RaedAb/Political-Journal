const express = require('express')
const router = express.Router()
const { validateToken } = require('../middleware/auth')
const { getContent, updateContent } = require('../controllers/content')

router.route('/:id').get(getContent).patch(validateToken, updateContent)

module.exports = router
