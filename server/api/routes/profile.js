const express = require('express')
const ProfileController = require('../controllers/profile')
const ProfileDbService = require('../services/profile')
const ProfileModel = require('../models/profile')
const auth = require('../middleware/route/authenticate')

const router = express.Router()

const profileService = new ProfileDbService(ProfileModel)
const profileController = new ProfileController(profileService)

const { getProfile, followUser, unfollowUser, updateUserProfile } = profileController

router.get('/:username', getProfile)

router.post('/:username/follow', auth.required, followUser)

router.put('/update-profile', auth.required, updateUserProfile)

router.delete('/:username/unfollow', auth.required, unfollowUser)

module.exports = router
