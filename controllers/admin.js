const { NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

/**
 * @post    : Updates the admin credentials
 * @route   : GET /api/v1/admin/:id
 * @access  : private
 */
const updateAdmin = async (req, res) => {
    const { id: adminID } = req.params
    const newAdmin = req.body

    // Hash the password
    newAdmin.password = await bcrypt.hash(newAdmin.password, 10)

    const admin = await Admin.findOneAndUpdate({ _id: adminID }, newAdmin, {
        new: true,
        runValidators: true,
    })
    if (!admin) {
        throw new NotFoundError(`Not admin with id: ${adminID}`)
    }

    res.status(StatusCodes.OK).json({ msg: `Successfully updated credentials` })
}

module.exports = { updateAdmin }
