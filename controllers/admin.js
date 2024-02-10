const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * @post    : Provide access token for admin routes
 * @route   : GET /api/v1/admin/login
 * @access  : public
 */
const adminLogin = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400).json({ msg: `Please enter username and password`})
    }

    const admin = await Admin.findOne({ username })

    // compare password with hashed password
    if (admin && (await bcrypt.compare(password, admin.password))) {
        const accessToken = jwt.sign({
            admin: {
                username: admin.username,
                email: admin.email,
                id: admin._id
            }, 
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        res.status(200).json({accessToken})
    } else {
        res.status(401).json({ msg: `Username or password is incorrect`})
    }
}

/**
 * @post    : Updates the admin credentials
 * @route   : GET /api/v1/admin/:id
 * @access  : private
 */
const updateAdmin = async (req, res) => {
    try {
        const { id: adminID } = req.params
        const newAdmin = req.body

        // Hash the password
        newAdmin.password = await bcrypt.hash(newAdmin.password, 10)

        const admin = await Admin.findOneAndUpdate({ _id: adminID }, newAdmin, {
            new: true,
            runValidators: true,
        })
        if (!admin) {
            return res.status(404).json({ msg: `No admin with id: ${adminID}` })
        }

        res.status(200).json({ msg: `Successfully updated credentials` })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = { updateAdmin, adminLogin }
