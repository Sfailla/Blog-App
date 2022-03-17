const { compare, hash } = require('bcryptjs')
const { sign, verify } = require('jsonwebtoken')
const crypto = require('crypto')

/**
 * ===============================
 * ==  	  HELPER FUNCTIONS    	==
 * ===============================
 */

const makeAuthUser = user => {
  const { id, username, email, role } = user
  return { id, username, email, role }
}

const makeUserProfile = async (profile, user) => {
  return {
    id: profile._id,
    username: profile.username,
    bio: profile.bio,
    fullname: profile.fullname,
    avatar: profile.avatar,
    favorites: profile.favorites,
    following: profile.following,
    isFollowing: user ? await profile.isFollowing(user._id) : false
  }
}

const comparePasswordBcrypt = async (password, userPassword) => {
  return await compare(password, userPassword)
}

const hashPasswordBcrypt = async (password, salt = 10) => {
  return await hash(password, salt)
}

const verifyToken = async (token, secret) => {
  return verify(token, secret)
}

const random_uuid = encryptionLength => {
  return crypto.randomBytes(encryptionLength).toString('hex')
}

const signAndSetCookie = (res, value) => {
  let options = {
    maxAge: 24 * 60 * 60 * 1000, // would expire after 1 day [24hrs]
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
    sameSite: 'strict' // prevents against xss attacks
  }
  res.cookie('refresh-token', value, options)
}

const findAndRetrieveCookie = req => {
  return req.signedCookies['refresh-token']
}

const generateAuthToken = user => {
  const credentials = {
    userId: user.id,
    username: user.username,
    role: user.role
  }
  const exp = { expiresIn: process.env.ACCESS_TOKEN_EXP }
  return sign(credentials, process.env.ACCESS_TOKEN_SECRET, exp)
}

const generateRefreshToken = user => {
  const credentials = {
    userId: user.id,
    username: user.username,
    role: user.role
  }
  const exp = { expiresIn: process.env.REFRESH_TOKEN_EXP }
  return sign(credentials, process.env.REFRESH_TOKEN_SECRET, exp)
}

const generateTokens = user => {
  const token = generateAuthToken(user)
  const refreshToken = generateRefreshToken(user)
  return { token, refreshToken }
}

module.exports = {
  signAndSetCookie,
  findAndRetrieveCookie,
  hashPasswordBcrypt,
  generateTokens,
  verifyToken,
  comparePasswordBcrypt,
  random_uuid,
  makeAuthUser,
  makeUserProfile
}
