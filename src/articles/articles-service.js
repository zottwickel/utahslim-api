const xss = require('xss')
const Treeize = require('treeize')

const ArticlesService = {
  getAllArticles(db) {
    return db
      .from('articles AS art')
      .select(
        'art.article_id',
        'art.title',
        'art.content',
        'art.date_modified',
        ...userFields,
        db.raw(
          `count(DISTINCT com) AS number_of_comments`
        ),
      )
      .leftJoin(
        'comments AS com',
        'art.article_id',
        'com.article_id'
      )
      .leftJoin(
        'users AS usr',
        'art.user_id',
        'usr.user_id'
      )
      .groupBy('art.article_id', 'usr.user_id')
      .orderBy('art.date_modified', 'decs')
  },
  insertArticle(db, newArticle) {
    return db
      .insert(newArticle)
      .into('articles')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getArticleById(db, article_id) {
    return ArticlesService.getAllArticles(db)
      .where('art.article_id', article_id)
      .first()
  },
  deleteArticle(db, article_id) {
    return db('articles')
      .where({ article_id })
      .delete()
  },
  updateArticle(db, article_id, newFields) {
    return db('articles')
      .where({ article_id })
      .update(newFields)
  },
  getCommentsForArticle(db, article_id) {
    return db
      .from('comments AS com')
      .select(
        'com.comment_id',
        'com.text',
        'com.date_created',
        ...userFields,
      )
      .where('com.article_id', article_id)
      .leftJoin(
        'users AS usr',
        'com.user_id',
        'usr.user_id'
      )
      .groupBy('com.comment_id', 'usr.user_id')
      .orderBy('com.date_created', 'asc')
  },
  serializeArticles(articles) {
    return articles.map(this.serializeArticle)
  },
  serializeArticle(article) {
    const articleTree = new Treeize()
    const articleData = articleTree.grow([ article ]).getData()[0]
    return {
      article_id: articleData.article_id,
      title: xss(articleData.title),
      content: xss(articleData.content),
      date_modified: articleData.date_modified,
      number_of_comments: Number(articleData.number_of_comments) || 0,
      user: articleData.user || {},
      
    }
  },
  serializeComments(comments) {
    return comments.map(this.serializeComment)
  },
  serializeComment(comment) {
    const commentTree = new Treeize()
    const commentData = commentTree.grow([ comment ]).getData()[0]

    return {
      comment_id: commentData.comment_id,
      article_id: commentData.article_id,
      text: xss(commentData.text),
      date_created: commentData.date_created,
      user: commentData.user || {},
    }
  },
}

const userFields = [
  'usr.user_id AS user:user_id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.email AS user:email',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified',
]

module.exports = ArticlesService