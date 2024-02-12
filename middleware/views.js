const path = require('path')

const setViewsForPages = (req, res, next) => {
    req.app.set('views', path.join(__dirname, '..', 'views', 'pages'))
    next()
}

const setViewsForAdmin = (req, res, next) => {
    req.app.set('views', path.join(__dirname, '..', 'views', 'admin'))
    next()
}

module.exports = { setViewsForPages, setViewsForAdmin }
