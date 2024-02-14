const Content = require('../models/content')

/**
 * @post    : Retrieves content
 * @route   : GET /api/v1/content
 * @access  : public
 */
const getContent = async (req, res) => {
    try {
        const content = await Content.find()
        if (!content) {
            return res
                .status(404)
                .json({ msg: `No content with id: ${contentID}` })
        }

        res.status(200).json({ content })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error' })
    }
}

/**
 * @post    : Updates content
 * @route   : GET /api/v1/content/:id
 * @access  : private
 */
const updateContent = async (req, res) => {
    try {
        const { id: contentID } = req.params
        const content = await Content.findOneAndUpdate(
            { _id: contentID },
            req.body,
            { new: true, runValidators: true }
        )
        if (!content) {
            return res
                .status(404)
                .json({ msg: `No content with id: ${contentID}` })
        }

        res.status(200).json({content})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getContent,
    updateContent,
}
