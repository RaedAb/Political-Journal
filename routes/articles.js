const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/auth')
const {
    getAllArticles,
    createArticle,
    getArticle,
    updateArticle,
    deleteArticle,
} = require('../controllers/articles')

router
    .route('/')
    .get(getAllArticles)
    .post(validateToken, createArticle)

router
    .route('/:id')
    .get(getArticle)
    .patch(validateToken, updateArticle)
    .delete(validateToken, deleteArticle)

module.exports = router
