const express = require('express')
const ArticlesService = require('./articles-service')

const articlesRouter = express.Router()

articlesRouter
  .route('/')
  .get((req, res, next) => {
    ArticlesService.getAllArticles(req.app.get('db'))
      .then(articles => {
        res.json(ArticlesService.serializeArticles(articles))
      })
      .catch(next)
  })

module.exports = articlesRouter