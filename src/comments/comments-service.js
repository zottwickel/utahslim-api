const xss = require('xss')

const CommentsService = {
  deleteComment(db, id) {
    return db('comments')
      .where({ id })
      .delete()
  },
  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into('comments')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  serializeComment(comment) {
    return {
      id: comment.id,
      text: xss(comment.text),
      date_created: comment.date_created,
      user_id: comment.user_id,
      article_id: comment.article_id
    }
  }
}

module.exports = CommentsService