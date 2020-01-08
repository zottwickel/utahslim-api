const express = require('express')
const path = require('path')
const ArticlesService = require('./articles-service')
const { requireAuth } = require('../middleware/jwt-auth')

const articlesRouter = express.Router()
const jsonParser = express.json()

articlesRouter
  .route('/')
  .get((req, res, next) => {
    ArticlesService.getAllArticles(req.app.get('db'))
      .then(articles => {
        res.json(ArticlesService.serializeArticles(articles))
      })
      .catch(next)
  })
  .post(requireAuth, jsonParser, (req, res, next) => {
    const { title, content } = req.body
    const user_id = req.user.user_id

    const newArticle = { user_id, title, content }

    for (const [key, value] of Object.entries(newArticle)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }
    ArticlesService.insertArticle(
      req.app.get('db'),
      newArticle
    )
      .then(article => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${article.article_id}`))
          .json(ArticlesService.serializeArticle(article))
      })
      .catch(next)    
  })

articlesRouter
  .route('/:article_id')
  .all(checkArticleExists)
  .get((req, res) => {
    res.json(ArticlesService.serializeArticle(res.article))
  })
  .delete((req, res, next) => {
    ArticlesService.deleteArticle(
      req.app.get('db'),
      req.params.article_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(requireAuth, jsonParser, (req, res, next) => {
    const { title, content } = req.body
    const user_id = user.user_id

    const updateArticle = { user_id, title, content, date_modified: new Date() }

    const numberOfValues = Object.values(updateArticle).filter(Boolean).length
      if (numberOfValues === 0) {
        return res.status(400).json({
          error: { message: `Request body must contain at least one of the following: user_id, title and/or content` } 
        })
      }
      const responseArticle = ArticlesService.serializeArticle(res.article)
      if (responseArticle.user.user_id !== updateArticle.user_id) {
        return res.status(400).json({
          error: { message: `You cannot update someone else's article` }
        })
      }

    ArticlesService.updateArticle(
      req.app.get('db'),
      req.params.article_id,
      updateArticle
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

articlesRouter
  .route('/:article_id/comments')
  .all(checkArticleExists)
  .get((req, res, next) => {
    ArticlesService.getCommentsForArticle(
      req.app.get('db'),
      req.params.article_id
    )
      .then(comments => {
        res.json(ArticlesService.serializeComments(comments))
      })
      .catch(next)
  })

async function checkArticleExists(req, res, next) {
  try {
    const article = await ArticlesService.getArticleById(
      req.app.get('db'),
      req.params.article_id
    )

    if (!article)
      return res.status(404).json({
        error: `Article does not exist`
      })
    
    res.article = article
    next()
  } catch(error) {
    next(error)
  }
}
module.exports = articlesRouter