const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided or invalid format')
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!decoded) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }

    req.user = decoded
    next()
}

const validateCookie = (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
        throw new UnauthenticatedError('Session expired')
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    if (!decoded) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }

    req.user = decoded
    next();
}

module.exports = { validateToken, validateCookie }
