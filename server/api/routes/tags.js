const express = require('express')
const ArticleModel = require('../models/article')
const TagsController = require('../controllers/tags')

const router = express.Router()

const tagsController = new TagsController(ArticleModel)

router.get('/', tagsController.getAllTags)

module.exports = router
