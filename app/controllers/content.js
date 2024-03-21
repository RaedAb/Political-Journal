const Content = require('../models/content')
const { NotFoundError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

/**
 * @post    : Retrieves content
 * @route   : GET /api/v1/content
 * @access  : public
 */
const getContent = async (req, res) => {
    const content = await Content.find()
    if (!content) {
        throw new NotFoundError(
            `Content with id ${articleID} could not be found`
        )
    }

    res.status(StatusCodes.OK).json({ content })
}

/**
 * @post    : Updates content
 * @route   : GET /api/v1/content/:id
 * @access  : private
 */
const updateContent = async (req, res) => {
    const { id: contentID } = req.params
    const content = await Content.findOneAndUpdate(
        { _id: contentID },
        req.body,
        { new: true, runValidators: true }
    )
    if (!content) {
        throw new NotFoundError(
            `Content with id ${articleID} could not be found`
        )
    }

    res.status(StatusCodes.OK).json({ content })
}

module.exports = {
    getContent,
    updateContent,
}
