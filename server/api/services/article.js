const { isValidObjId } = require('../database/db/index')
const { ValidationError } = require('../middleware/utils/errors')
const { trimRequest } = require('../helpers/validation')

const {
  makeArticleObj,
  formatTags,
  formatFavorites,
  makeCommentObj
} = require('../helpers/article')
const { isValidObjectId } = require('mongoose')

module.exports = class ArticleDatabaseService {
  constructor(articleModel, userModel, profileModel, commentModel) {
    this.article = articleModel
    this.user = userModel
    this.profile = profileModel
    this.comment = commentModel
  }

  // article error method to keep class DRY
  articleError = errMsg => ({ err: new ValidationError(400, errMsg) })

  // create article
  createArticle = async (user, articleFields) => {
    const profile = await this.profile.findOne({ username: user.username })

    if (!profile) {
      return this.articleError('error fetching user')
    }

    const article = await this.article.create({
      author: profile._id,
      ...trimRequest(articleFields)
    })

    const updatedArticle = await this.article.findOne(article._id).populate({
      path: 'author',
      model: 'Profile',
      select: ['username', 'bio', 'image']
    })

    if (!article) {
      return this.articleError('error creating article')
    }
    return {
      article: await makeArticleObj(updatedArticle),
      message: 'successfully created article'
    }
  }

  // get all articles with filters
  getAllArticles = async (user, filters) => {
    let profile
    let buildQuery = {}
    const options = {
      sort: { updatedAt: filters.sortBy },
      limit: Number(filters.limit),
      skip: Number(filters.offset)
    }
    // query by tags
    if (filters.tags) {
      buildQuery['tags'] = { $in: formatTags(filters.tags) }
    }
    // query by author
    if (filters.author) {
      profile = await this.profile.findOne({ username: filters.author })
      if (!profile) return this.articleError("sorry that author doesn't exist")
      buildQuery['author'] = profile._id.toString()
    }
    // query by current users favorite articles.
    // This would be done by frontend filtering by favorites then sending the current
    // user as the filter value.  filter => favorites:steve
    if (filters.favorites) {
      profile = await this.profile.findOne({ username: filters.favorites })
      if (!profile) return this.articleError("sorry that username doesn't exist")
      buildQuery['_id'] = {
        $in: formatFavorites(profile.favorites)
      }
    }

    const userProfile = user ? await this.profile.findOne({ username: user.username }) : null

    // aggregate for individual filter or all filters
    const query = { $or: [buildQuery] }
    const articles = await this.article.find(query, null, options).populate({
      path: 'author',
      model: 'Profile',
      select: ['username', 'bio', 'image']
    })

    if (!articles) {
      return this.articleError('error fetching all articles')
    }
    const copyArticles = articles.map(article => makeArticleObj(article, userProfile))

    return {
      articles: await Promise.all(copyArticles),
      articlesCount: copyArticles.length
    }
  }

  // get all articles by logged in user
  getUserArticles = async (authUser, filters) => {
    const profile = await this.profile.findOne({ user: authUser.id })

    if (!profile) {
      return this.articleError('error retrieving user')
    }

    const sorting = {
      query: { author: profile._id },
      options: {
        sort: { updatedAt: filters.sortBy },
        limit: Number(filters.limit),
        skip: Number(filters.offset)
      }
    }

    if (isValidObjId(authUser.id)) {
      const articles = await this.article.find(sorting.query, null, sorting.options).populate({
        path: 'author',
        model: 'Profile',
        select: ['username', 'bio', 'image']
      })

      if (!articles) {
        return this.articleError('error retrieving articles')
      }

      const copyArticles = articles.map(article => makeArticleObj(article, profile))

      return {
        articles: await Promise.all(copyArticles),
        articlesCount: copyArticles.length
      }
    } else {
      return this.articleError(`invalid object id => ${authUser.id}`)
    }
  }

  // get article by slug
  getArticleBySlug = async slug => {
    const article = await this.article.findOne({ slug }).populate({
      path: 'author',
      model: 'Profile',
      select: ['username', 'bio', 'image']
    })
    if (!article) {
      return this.articleError('error fetching article slug')
    }

    return { article: await makeArticleObj(article) }
  }

  // get user article by slug
  getUserArticleBySlug = async (user, slug) => {
    const article = await this.article.findOne({ slug }).populate({
      path: 'author',
      model: 'Profile',
      select: ['username', 'bio', 'image']
    })

    if (!article) {
      return this.articleError('error fetching article slug')
    }

    const profile = await this.profile.findOne({ username: user.username })

    if (!profile) {
      return this.articleError('error fetching user profile')
    }

    return { article: await makeArticleObj(article, profile) }
  }

  // set favorite articles
  setFavoriteArticle = async (authUser, slug) => {
    const articleSchema = await this.article.findOne({ slug })

    if (!articleSchema) {
      return this.articleError(
        "error retrieving article. it's possible that the wrong article was entered"
      )
    }

    const getProfile = await this.profile.findOne({ user: authUser.id })

    if (!getProfile) {
      return this.articleError('error initializing favorite article')
    }

    const profile = await getProfile.favorite(articleSchema._id)
    const article = await articleSchema.updateCount('inc')

    return { article: await makeArticleObj(article, profile) }
  }

  // remove favorite article
  removeFavoriteArticle = async (authUser, slug) => {
    const articleSchema = await this.article.findOne({ slug })

    if (!articleSchema) {
      return this.articleError(
        "error retrieving article. it's possible that the wrong article was entered"
      )
    }

    const getProfile = await this.profile.findOne({ user: authUser.id })

    if (!getProfile) {
      return this.articleError('err initializing unfavorite article')
    }

    const profile = await getProfile.unfavorite(articleSchema._id)
    const article = await articleSchema.updateCount()

    return {
      article: await makeArticleObj(article, profile),
      message: `article ${article.title} was removed from favorites`
    }
  }

  // update user article
  findAndUpdateArticle = async (slug, updates) => {
    const query = { slug }
    const update = { ...trimRequest(updates), updatedAt: Date.now() }

    let article = await this.article.findOneAndUpdate(query, update, { new: true }).populate({
      path: 'author',
      model: 'Profile',
      select: ['username', 'bio', 'image']
    })

    if (!article) {
      return this.articleError('error updating article')
    }

    return {
      article: await makeArticleObj(article),
      message: 'successfully updated article'
    }
  }

  // remove user article
  findAndDeleteArticle = async (authUser, slug) => {
    const article = await this.article.findOneAndDelete({
      author: authUser.id,
      slug
    })
    if (!article) {
      return this.articleError('error deleting article')
    }
    return {
      article: await makeArticleObj(article),
      message: `deleted article: ${article.title}`
    }
  }

  createCommentForArticle = async (authUser, articleSlug, commentFields) => {
    const profile = await this.profile.findOne({ user: authUser.id })

    if (!profile) {
      this.articleError('error initializing create comment')
    }

    const article = await this.article.findOne({ slug: articleSlug })
    const createComment = {
      ...commentFields,
      article: article._id,
      author: authUser.id
    }

    if (!article) {
      this.articleError('error initializing create comment')
    }

    const createdComment = await this.comment.create({ ...createComment })

    const comment = await this.comment.findOne({ _id: createdComment._id }).populate({
      path: 'author',
      model: 'User',
      select: ['username', 'name', 'email']
    })

    if (!comment) return this.articleError('error creating comment')
    // await article.addComment(article._id, comment)

    return {
      comment: makeCommentObj(comment),
      message: 'successfully created comment!'
    }
  }

  fetchCommentsForArticle = async articleSlug => {
    const article = await this.article.findOne({ slug: articleSlug })

    if (!article) {
      return this.articleError(
        "error fetching article. It's possible that you accidentally entered the wrong article name"
      )
    }

    const getComments = await this.comment
      .find({ article: article._id }, null, {
        sort: { createdAt: -1 },
        limit: 10,
        skip: 0
      })
      .populate({
        path: 'author',
        model: 'User',
        select: ['username', 'name', 'email']
      })

    if (!getComments) {
      return this.articleError(`error fetching comments for ${article.title}`)
    }

    const comments = getComments.map(comment => makeCommentObj(comment))
    const commentsCount = comments.length

    return {
      comments,
      commentsCount
    }
  }

  findAndUpdateComment = async (authUser, updateField, commentId) => {
    const query = { _id: commentId, author: authUser.id }
    const updates = {
      ...trimRequest(updateField),
      updatedAt: Date.now()
    }

    const comment = await this.comment.findOneAndUpdate(query, updates, {
      new: true
    })

    if (!comment) {
      return this.articleError('error updating comment')
    }
    return {
      comment,
      message: 'successfully updated comment'
    }
  }

  removeUserComment = async (authUser, articleSlug, commentId) => {
    const article = await this.article.findOne({ slug: articleSlug })

    if (!article) {
      return this.articleError(
        "error fetching article. It's possible that you accidentally entered the wrong article name"
      )
    }

    const comment = await this.comment.findOne({ _id: commentId })

    if (!comment) {
      return this.articleError('error initializing delete comment')
    }
    const updatedArticle = await article.deleteComment(commentId)
    await comment.deleteComment(authUser.id, commentId)

    if (!updatedArticle) {
      return this.articleError('error updating comment;')
    }

    return {
      article: makeArticleObj(updatedArticle),
      comment: makeCommentObj(comment)
    }
  }
}
