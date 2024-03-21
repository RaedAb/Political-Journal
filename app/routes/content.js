const express = require('express')
const router = express.Router()
const { validateToken } = require('../middleware/auth')
const { getContent, updateContent } = require('../controllers/content')

router.route('/').get(getContent)
router.route('/:id').patch(validateToken, updateContent)

module.exports = router
