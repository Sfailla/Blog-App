const { generateTokens, signAndSetCookie } = require('../helpers/user-auth')

module.exports = class AuthController {
  constructor(databaseService) {
    this.service = databaseService
  }

  registerUser = async (req, res, next) => {
    try {
      const { user, err } = await this.service.createUser(req.body)
      const { token, refreshToken } = generateTokens(user)

      if (err) throw err

      await this.service.createProfile(user)

      res.set('x-auth-token', token)
      res.set('x-refresh-token', refreshToken)
      signAndSetCookie(res, refreshToken)

      await res.status(201).json({
        message: `successfully created account for ${user.username}`,
        user
      })
    } catch (error) {
      next(error)
    }
  }

  loginUser = async (req, res, next) => {
    try {
      const { user, err } = await this.service.getUserByEmailAndPassword(req.body, req)
      // if (err) {
      //   return res.status(400).json({
      //     message: err.message
      //   })
      // }

      if (err) throw err

      const { token, refreshToken } = generateTokens(user)

      signAndSetCookie(res, refreshToken)
      res.set('x-auth-token', token)
      res.set('x-refresh-token', refreshToken)

      await res.status(200).json({ user })
    } catch (error) {
      next(error)
    }
  }

  logoutUser = async (req, res, next) => {
    await this.service.destroyUserSessionOnLogout(req, res)
    await res.json({
      message: 'user successfully logged out!',
      user: null
    })
  }

  getUserById = async (req, res, next) => {
    try {
      const { user, err } = await this.service.getUserById(req.params.id)
      if (err) throw err
      await res.status(200).json({ user })
    } catch (error) {
      next(error)
    }
  }

  getAllUsers = async (req, res, next) => {
    try {
      const { users, err } = await this.service.getAllUsers()
      if (err) throw err
      await res.status(200).json({ users })
    } catch (error) {
      next(error)
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const { user, err } = await this.service.findAndRemoveUser(req.user, req.params.id)
      if (err) throw err
      await res.status(200).json({
        message: `successfully removed user: ${user.username}`,
        user
      })
    } catch (error) {
      next(error)
    }
  }

  refreshTokens = async (req, res, next) => {
    try {
      const { token, refreshToken, user, err } = await this.service.refreshUserTokens(req, res)

      if (err) throw err

      res.set('x-auth-token', token)
      res.set('x-refresh-token', refreshToken)

      await res.status(200).json({
        token,
        refreshToken,
        user
      })
    } catch (error) {
      next(error)
    }
  }
}
