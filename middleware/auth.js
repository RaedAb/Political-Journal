const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Return a specific error response when no token or invalid format
        return res
            .status(401)
            .json({ error: 'No token provided or invalid format' })
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if (decoded) {
            next()
        } else {
            return res.status(401).json({ msg: 'Unauthorized' })
        }

        // Call next middleware if token is valid
    } catch (error) {
        // Log the error and return an error response
        console.error(error)
        return res.status(401).json({ error: 'Invalid token' })
    }
}

const validateCookie = async (req, res, next) => {
    const accessToken = req.cookies.accessToken
    try {
        if (!accessToken) {
            return res.status(401).send('<h1>Session expired. Please <a href="/admin/login">log in</a></h1>')
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        if (decoded) {
            next()
        } else {
            return res.status(401).json({ msg: 'Unauthorized' })
        }
    } catch (error) {
        console.error(error)
        return res.status(401).json({ error: 'Invalid token' })
    }
}

module.exports = { validateToken, validateCookie }
