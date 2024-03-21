const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const { BadRequestError, UnauthenticatedError } = require('../errors')

/**
 * @post    : Serves the login oage for admins
 * @route   : GET /admin/login
 * @access  : public
 */
const getLoginPage = (req, res) => {
    res.render('login')
}

const authenticateLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new BadRequestError('Please provide username and password')
    }

    const admin = await Admin.findOne({ username })

    // compare password with hashed password
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const accessToken = jwt.sign(
        {
            admin: {
                username: admin.username,
                email: admin.email,
                id: admin._id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    )

    res.cookie('accessToken', accessToken, {
        maxAge: 3600000,
    })
    res.redirect('/admin')
}

const getAdminIndex = async (req, res) => {
    const response = await axios.get('http://localhost:5000/api/v1/articles')
    const { articles } = response.data

    // Sort the articles by date in descending order (newest to oldest)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date))

    // Take the first 9 articles
    const firstNineArticles = articles.slice(0, 12)

    res.render('admin-index', { articles: firstNineArticles })
}

const getAdminArticles = async (req, res) => {
    const response = await axios.get('http://localhost:5000/api/v1/articles')
    const { articles } = response.data

    // Sort the articles by date in descending order (newest to oldest)
    articles.sort((a, b) => new Date(b.date) - new Date(a.date))

    res.render('admin-articles', { articles })
}

const getAdminSingleArticle = async (req, res) => {
    const { id } = req.params
    const response = await axios.get('http://localhost:5000/api/v1/articles')
    // I use get all articles api bc im loading one and then all below it
    const { articles } = response.data
    const article = articles.find((article) => article._id === id)

    res.render('edit-article', {
        articles: articles.filter((a) => a._id !== id),
        article,
    })
}

const getCreateArticlePage = (req, res) => {
    res.render('create-article')
}

const getAdminAboutUs = async (req, res) => {
    const response = await axios.get('http://localhost:5000/api/v1/content')
    const [content] = response.data.content
    res.render('edit-about', { content })
}

const getAdminContact = async (req, res) => {
    const response = await axios.get('http://localhost:5000/api/v1/content')
    const [content] = response.data.content
    res.render('edit-contact', { content })
}

module.exports = {
    getLoginPage,
    getAdminIndex,
    getAdminArticles,
    authenticateLogin,
    getCreateArticlePage,
    getAdminSingleArticle,
    getAdminAboutUs,
    getAdminContact,
}
