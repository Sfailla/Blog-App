const { ValidationError } = require('../middleware/utils/errors')
const { isValidObjId } = require('../database/db/index')
const { trimRequest } = require('../helpers/validation')
const {
  generateTokens,
  signAndSetCookie,
  findAndRetrieveCookie,
  hashPasswordBcrypt,
  comparePasswordBcrypt,
  makeAuthUser,
  verifyToken
} = require('../helpers/user-auth')

class UserDatabaseService {
  constructor(userModel, profileModel) {
    this.userModel = userModel
    this.profileModel = profileModel
  }

  createUser = async userFields => {
    const trimmedRequest = trimRequest(userFields)
    const hashedPassword = await hashPasswordBcrypt(trimmedRequest.password)
    const getUser = await this.userModel.create({
      ...trimmedRequest,
      password: hashedPassword
    })

    if (!getUser) {
      const err = new ValidationError(400, 'error creating user')
      return { err }
    }
    return { user: makeAuthUser(getUser) }
  }

  createProfile = async user => {
    const profile = await this.profileModel.create({
      user: user.id,
      username: user.username
    })
    return { profile }
  }

  refreshUserTokens = async (req, res) => {
    const getRefreshToken = findAndRetrieveCookie(req)
    const verifiedToken = await verifyToken(getRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    const user = await this.userModel.findOne({ _id: verifiedToken.userId })

    if (!getRefreshToken || !verifiedToken || !user) {
      const errMsg = 'error refreshing token'
      return { err: new ValidationError(401, errMsg) }
    }

    const { token, refreshToken } = generateTokens(user)
    signAndSetCookie(res, refreshToken)
    return { token, refreshToken, user }
  }

  destroyRefreshTokenOnLogout = (req, res) => {
    res.clearCookie('refresh-token')
    res.set('x-auth-token', null)
    res.set('x-refresh-token', null)
    req.user = null
  }

  getUserByEmailAndPassword = async (fields, req) => {
    const trimmedRequest = trimRequest(fields)
    const { user, err } = await this.getUserByEmail(trimmedRequest.email)
    req.user = user

    if (err) return { err }

    const isValidPassword = await comparePasswordBcrypt(trimmedRequest.password, user.password)

    if (!isValidPassword) {
      const errMsg = 'user password does not match our records'
      const err = new ValidationError(400, errMsg)
      return { err }
    }

    return { user: makeAuthUser(user) }
  }

  getUserByEmail = async email => {
    const user = await this.userModel.findOneAndUpdate({ email }, { new: true })
    if (!user) {
      const errMsg = 'user email does not match our records'
      const err = new ValidationError(400, errMsg)
      return { err }
    }
    return { user }
  }

  getUserById = async userId => {
    if (userId && isValidObjId(userId)) {
      let user = await this.userModel.findOne({ _id: userId })

      if (!user) {
        const errMsg = 'user does not match our records'
        const err = new ValidationError(400, errMsg)
        return { err }
      }
      return { user: makeAuthUser(user) }
    } else {
      const errMsg = `invalid object id => ${userId}`
      const err = new ValidationError(400, errMsg)
      return { err }
    }
  }

  getAllUsers = async () => {
    const users = await this.userModel.find({})

    if (!users) {
      const errMsg = 'error retrieving users'
      const err = new ValidationError(400, errMsg)
      return { err }
    }

    const copiedUsers = users.map(user => makeAuthUser(user))
    return { users: copiedUsers }
  }

  findAndRemoveUser = async (authUser, userId) => {
    if (authUser.id.toString() === userId.toString() || authUser.role === 'admin') {
      const user = await this.userModel.findOneAndDelete({
        _id: userId
      })

      const errMsg = 'error retrieving user from database'
      if (!user) return { err: new ValidationError(400, errMsg) }

      return { user: makeAuthUser(user) }
    } else {
      return { err: new ValidationError(401, 'unauthorized request') }
    }
  }

  getSessionUser = async req => {
    if (!req.user) {
      const message = 'no authenticated user'
      return { message }
    }

    console.log({ user: req.user })

    let user = await this.userModel.findOne({ _id: req.user.id })

    if (!user) {
      const errMsg = 'user does not match our records'
      const err = new ValidationError(400, errMsg)
      return { err }
    }

    return { user: makeAuthUser(user) }
  }
}

module.exports = UserDatabaseService
