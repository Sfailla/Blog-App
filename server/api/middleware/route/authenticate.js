const { verifyToken, makeAuthUser } = require('../../helpers/user-auth')
const { ValidationError, TokenExpiredError } = require('../utils/errors')
const UserModel = require('../../models/user')

const required = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    const verifiedUser = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET)

    if (!verifiedUser) {
      const errMsg = 'error verifying user token in validation middleware'
      throw new TokenExpiredError(400, errMsg)
    }

    const user = await UserModel.findById(verifiedUser.userId)
    req.user = makeAuthUser(user)

    await next()
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      error.status = 403
      await next(error)
    }
    await next(error)
  }
}

module.exports = { required }
