const express = require('express')
const router = express.Router()
const {updateAdmin, adminLogin} = require('../controllers/admin')
const validateToken = require('../middleware/auth')

router.post('/login', adminLogin)
router.patch('/:id', validateToken, updateAdmin)

module.exports = router