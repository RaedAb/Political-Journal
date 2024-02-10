const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.send('No token provided')
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
        
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ msg: 'User is not authorized' })
    }
}

module.exports = validateToken
