const { Router } = require('express')
const { auth } = require('../middleware/index')

const ArticleController = require('../controllers/article')
const ArticleDbService = require('../services/article')
const { ArticleModel, UserModel, ProfileModel, CommentModel } = require('../models')

const articleService = new ArticleDbService(ArticleModel, UserModel, ProfileModel, CommentModel)
const articleController = new ArticleController(articleService)

const {
  unfavoriteArticle,
  favoriteArticle,
  getArticle,
  getArticles,
  getComments,
  createArticle,
  getUserArticles,
  updateArticle,
  deleteArticle,
  createComment,
  updateComment,
  deleteComment
} = articleController

const router = Router()

router.get('/', auth.optional, getArticles)

router.get('/:article', auth.required, getArticle)

router.get('/user/article', auth.required, getUserArticles)

router.get('/:article/comment', getComments)

router.post('/', auth.required, createArticle)

router.post('/:article/favorite', auth.required, favoriteArticle)

router.post('/:article/comment', auth.required, createComment)

router.put('/:article', auth.required, updateArticle)

router.put('/:article/comment/:comment', auth.required, updateComment)

router.delete('/:article/favorite', auth.required, unfavoriteArticle)

router.delete('/:article', auth.required, deleteArticle)

router.delete('/:article/comment/:comment', auth.required, deleteComment)

module.exports = router
