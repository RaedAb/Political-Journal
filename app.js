const express = require('express')
const app = express()

// Import route files
const aboutRouter = require('./routes/about')
const articlesRouter = require('./routes/articles-route')
const contactRouter = require('./routes/contact')
const articles = require('./routes/articles')

// Connect to the Data Base
const connectDB = require('./db/connect')
require('dotenv').config()

//Static assets
app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

// api
app.use('/api/v1/articles', articles)

// Use route files
app.use('/about', aboutRouter)
app.use('/articles', articlesRouter)
app.use('/contact', contactRouter)

// 404 Route
app.all('*', (req, res) => {
    res.status(404).send('Resource not found')
})

const port = 5000
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
