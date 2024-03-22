const cookieParser = require('cookie-parser')
require('express-async-errors')
const express = require('express')
const app = express()
const path = require('path')
const articles = require('./routes/articles')
const content = require('./routes/content')
const admin = require('./routes/admin')
const router = require('./routes/routes')
const adminRouter = require('./routes/admin-routes')
const notFound = require('./middleware/not-found')
const { setViewsForPages, setViewsForAdmin } = require('./middleware/views')
const errorHandler = require('./middleware/error-handler')
const httpsRedirect = require('./middleware/https-redirect')

/**
 * Connect to the DB
 */
const connectDB = require('./db/connect')
require('dotenv').config()

/**
 * Cookie
 */
app.use(cookieParser())

/**
 * Serve ejs
 */
app.set('view engine', 'ejs')

//Static assets
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/**
 * Section for APIs
 */
app.use('/api/v1/articles', articles)
app.use('/api/v1/admin', admin)
app.use('/api/v1/content', content)

/**
 * Section for routes
 */
app.use('/', setViewsForPages, router)
app.use('/admin', setViewsForAdmin, adminRouter)

/**
 * Errors
 */
app.use(notFound)
app.use(errorHandler)

/**
 * HTTPS Redirect
 */
app.use(httpsRedirect)


const port = process.env.PORT || 5000
// Load the DB and then start the server:
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
