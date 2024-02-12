const express = require('express')
const router = express.Router()
const { getLoginPage, getAdminIndex, authenticateLogin, getCreateArticlePage } = require('../controllers/admin-routes')
const {validateCookie} = require('../middleware/auth')

router.get('/', validateCookie, getAdminIndex)
router.get('/create-article', validateCookie, getCreateArticlePage)
router.get('/login', getLoginPage)
router.post('/login', authenticateLogin)

module.exports = router
