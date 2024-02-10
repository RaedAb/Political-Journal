const express = require('express')
const router = express.Router()
const {getLoginPage, getAdminIndex} = require('../controllers/admin-routes')
const validateToken = require('../middleware/auth')

router.get('/login', getLoginPage)
router.get('/', validateToken, getAdminIndex)

module.exports = router