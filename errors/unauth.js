const APIError = require('./api-error')
const { StatusCodes } = require('http-status-codes')

class UnauthenticatedError extends APIError {
    constructor(message) {
        super(message)
        this.StatusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError;