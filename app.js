const express = require('express')
const app = express()
const path = require('path')
const articles = require('./routes/articles')
const router = require('./routes/routes')

// Connect to the Data Base
const connectDB = require('./db/connect')
require('dotenv').config()

// set view engine to ejs
app.set('view engine', 'ejs')

// //Static assets
app.use(express.static(path.join(__dirname, 'public')))

// // parse form data
app.use(express.urlencoded({ extended: false }))
// // parse json
app.use(express.json())

// api
app.use('/api/v1/articles', articles)

//routes
app.use('/', router)

// 404 Route
app.all('*', (req, res) => {
    res.status(404).send('Resource not found')
})

app.set('views', path.join(__dirname, 'views/pages'))

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
