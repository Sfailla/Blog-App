const checkUserPermissions = require('../utils/checkPermissions')
const { ValidationError, RequiredParameterError } = require('../utils/errors')

const requiredRole = userRole => async (req, res, next) => {
  try {
    if (!userRole) {
      const errMsg = 'must provide authorization role'
      throw new RequiredParameterError(422, errMsg)
    }

    if (!req.user) {
      const errMsg = 'must be logged in to access this route'
      throw new ValidationError(401, errMsg)
    }

    let userData

    userData = {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
      userRole
    }

    await checkUserPermissions(userData, ValidationError, next)
  } catch (error) {
    return next(error)
  }
}

module.exports = requiredRole
