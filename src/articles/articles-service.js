const xss = require('xss')

const ArticlesService = {
  getAllArticles(db) {
    return db
      .from('articles AS art')
      .select(
        'art.id',
        'art.title',
        'art.content',
        'art.date_modified'
      )
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
  serializeArticles(articles) {
    return articles.map(this.serializeArticle)
  },
  serializeArticle(article) {
    return {
      id: article.id,
      title: xss(article.title),
      content: xss(article.content),
      date_modified: article.date_modified
    }
  },
}

module.exports = ArticlesService