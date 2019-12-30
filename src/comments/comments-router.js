const express = require('express')
const path = require('path')
const CommentsService = require('./comments-service')

const commentsRouter = express.Router()
const jsonParser = express.json()

commentsRouter
  .route('/')
  .post(jsonParser, (req, res, next) => {
    const { text, user_id, article_id } = req.body
    const newComment = { text, user_id, article_id }

    for (const [key, value] of Object.entries(newComment)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    CommentsService.insertComment(
      req.app.get('db'),
      newComment
    )
      .then(comment => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${comment.id}`))
          .json(CommentsService.serializeComment(comment))
      })
      .catch(next)
  })

commentsRouter
  .route('/:comment_id')
  .delete((req, res, next) => {
    CommentsService.deleteComment(
      req.app.get('db'),
      req.params.comment_id
    )
      .then(() =>{
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = commentsRouter