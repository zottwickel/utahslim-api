const xss = require('xss')

const CommentsService = {
  deleteComment(db, comment_id) {
    return db('comments')
      .where({ comment_id })
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
      comment_id: comment.comment_id,
      text: xss(comment.text),
      date_created: comment.date_created,
      user_id: comment.user_id,
      article_id: comment.article_id
    }
  }
}

module.exports = CommentsService