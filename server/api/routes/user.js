const UserDatabaseService = require('../services/user')
const AuthController = require('../controllers/user')
const { Router } = require('express')
const { auth, requiredRole } = require('../middleware/index')
const UserModel = require('../models/user')
const ProfileModel = require('../models/profile')

const authService = new UserDatabaseService(UserModel, ProfileModel)
const authController = new AuthController(authService)

const {
  loginUser,
  logoutUser,
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
  refreshTokens,
  getSessionUser
} = authController

const router = Router()

/**
 * =================
 * == USER ROUTES ==
 * =================
 */

// create user
router.post('/register', registerUser)

// login user
router.post('/login', loginUser)

// logout user
router.get('/logout', requiredRole('user'), logoutUser)

// refresh token
router.get('/refresh-tokens', requiredRole('user'), refreshTokens)

// get session user
router.get('/session', auth.required, requiredRole('user'), getSessionUser)

/**
 * =======================
 * == ADMIN ONLY ROUTES ==
 * =======================
 */

// get all users
router.get('/admin/get-users', auth.required, requiredRole('admin'), getAllUsers)

// get specific user
router.get('/admin/user/:id', auth.required, requiredRole('admin'), getUserById)

// delete user
router.delete('/admin/user/:id', auth.required, requiredRole('admin'), deleteUser)

module.exports = router
