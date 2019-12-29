const xss = require('xss')
const Treeize = require('treeize')

const ArticlesService = {
  getAllArticles(db) {
    return db
      .from('articles AS art')
      .select(
        'art.id',
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
        'art.id',
        'com.article_id'
      )
      .leftJoin(
        'users AS usr',
        'art.user_id',
        'usr.id'
      )
      .groupBy('art.id', 'usr.id')
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
  getArticleById(db, id) {
    return ArticlesService.getAllArticles(db)
      .where('art.id', id)
      .first()
  },
  deleteArticle(db, id) {
    return db('articles')
      .where({ id })
      .delete()
  },
  updateArticle(db, id, newFields) {
    return db('articles')
      .where({ id })
      .update(newFields)
  },
  getCommentsForArticle(db, article_id) {
    return db
      .from('comments AS com')
      .select(
        'com.id',
        'com.text',
        'com.date_created',
        ...userFields,
      )
      .where('com.article_id', article_id)
      .leftJoin(
        'users AS usr',
        'com.user_id',
        'usr.id'
      )
      .groupBy('com.id', 'usr.id')
  },
  serializeArticles(articles) {
    return articles.map(this.serializeArticle)
  },
  serializeArticle(article) {
    const articleTree = new Treeize()
    const articleData = articleTree.grow([ article ]).getData()[0]
    return {
      id: articleData.id,
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
      id: commentData.id,
      article_id: commentData.article_id,
      text: xss(commentData.text),
      date_created: commentData.date_created,
      user: commentData.user || {},
    }
  },
}

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.email AS user:email',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified',
]

module.exports = ArticlesService