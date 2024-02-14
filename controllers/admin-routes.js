const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')

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

    try {
        if (!username || !password) {
            return res
                .status(400)
                .json({ msg: `Please enter username and password` })
        }

        const admin = await Admin.findOne({ username })

        // compare password with hashed password
        if (admin && (await bcrypt.compare(password, admin.password))) {
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
        } else {
            return res
                .status(401)
                .json({ msg: `Username or password is incorrect` })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Internal Server Error` })
    }
}

const getAdminIndex = async (req, res) => {
    try {
        const response = await axios.get(
            'http://localhost:5000/api/v1/articles'
        )
        const { articles } = response.data

        // Sort the articles by date in descending order (newest to oldest)
        articles.sort((a, b) => new Date(b.date) - new Date(a.date))

        // Take the first 9 articles
        const firstNineArticles = articles.slice(0, 12)

        // Render the index.ejs template and pass the sorted articles data
        res.render('admin-index', { articles: firstNineArticles })
    } catch (error) {
        console.log(error)
        console.error('Error fetching articles:', error.message)
        res.status(500).send('Internal Server Error')
    }
}

const getAdminArticles = async (req, res) => {
    try {
        // Make a request to API endpoint
        const response = await axios.get(
            'http://localhost:5000/api/v1/articles'
        )
        const { articles } = response.data

        // Sort the articles by date in descending order (newest to oldest)
        articles.sort((a, b) => new Date(b.date) - new Date(a.date))

        // Render the admin-articles.ejs template and pass the articles data
        res.render('admin-articles', { articles })
    } catch (error) {
        console.log(error)
        console.error('Error fetching articles:', error.message)
        res.status(500).send('Internal Server Error')
    }
}

const getAdminSingleArticle = async (req, res) => {
    try {
        const { id } = req.params
        const response = await axios.get(
            'http://localhost:5000/api/v1/articles'
        )
        // I use get all articles api bc im loading one and all below
        const { articles } = response.data
        const article = articles.find((article) => article._id === id)

        res.render('edit-article', {
            articles: articles.filter((a) => a._id !== id),
            article,
        })
    } catch (error) {
        console.log(error)
        console.error('Error fetching article:', error.message)
        res.status(500).send('Internal Server Error')
    }
}

const getCreateArticlePage = (req, res) => {
    res.render('create-article')
}

const getAdminAboutUs = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/content')
        const [content] = response.data.content
        res.render('edit-about', { content })
    } catch (error) {
        console.log(error)
        console.error('Error fetching articles:', error.message)
        res.status(500).send('Internal Server Error')
    }
}

const getAdminContact = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/content')
        const [content] = response.data.content
        res.render('edit-contact', { content })
    } catch (error) {
        console.log(error)
        console.error('Error fetching articles:', error.message)
        res.status(500).send('Internal Server Error')
    }
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
