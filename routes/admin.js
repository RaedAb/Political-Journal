const express = require('express')
const router = express.Router()
const {updateAdmin} = require('../controllers/admin')
const {validateToken} = require('../middleware/auth')

router.patch('/:id', validateToken, updateAdmin)

module.exports = router