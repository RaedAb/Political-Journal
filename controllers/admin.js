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

module.exports = { updateAdmin }
