const express = require('express')
const ArticlesService = require('./articles-service')

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
  .post(jsonParser, (req, res, next) => {
    const { user_id, title, content } = req.body
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
          .location(path.posix.join(req.originalUrl, `/${article.id}`))
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