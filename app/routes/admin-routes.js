const express = require('express')
const router = express.Router()
const {
    getLoginPage,
    getAdminIndex,
    authenticateLogin,
    getCreateArticlePage,
    getAdminSingleArticle,
    getAdminAboutUs,
    getAdminContact,
    getAdminArticles,
} = require('../controllers/admin-routes')
const { validateCookie } = require('../middleware/auth')

router.get('/', validateCookie, getAdminIndex)
router.get('/articles', validateCookie, getAdminArticles)
router.get('/create-article', validateCookie, getCreateArticlePage)
router.get('/articles/:id', validateCookie, getAdminSingleArticle)
router.get('/about', validateCookie, getAdminAboutUs)
router.get('/contact', validateCookie, getAdminContact)

// Public routes
router.get('/login', getLoginPage)
router.post('/login', authenticateLogin)

module.exports = router
