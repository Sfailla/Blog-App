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
  getUserArticle,
  getArticles,
  getArticle,
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

router.get('/', getArticles)

router.get('/article/:article', getArticle)

router.get('/user-article/:article', auth.required, getUserArticle)

router.get('/user-articles', auth.required, getUserArticles)

router.get('/:article/comments', getComments)

router.post('/', auth.required, createArticle)

router.post('/:article/favorite', auth.required, favoriteArticle)

router.post('/:article/comment', auth.required, createComment)

router.put('/:article', auth.required, updateArticle)

router.put('/:article/comment/:comment', auth.required, updateComment)

router.delete('/:article/favorite', auth.required, unfavoriteArticle)

router.delete('/:article', auth.required, deleteArticle)

router.delete('/:article/comment/:comment', auth.required, deleteComment)

module.exports = router
