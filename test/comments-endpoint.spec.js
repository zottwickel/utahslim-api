const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Comments Endpoints', function() {
  let db

  const testUsers = helpers.makeUsersArray()
  const testArticles = helpers.makeArticlesArray()
  const testComments = helpers.makeCommentsArray()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.truncateTables(db))

  afterEach('cleanup', () => helpers.truncateTables(db))

  describe(`POST /api/comments`, () => {
    beforeEach('insert articles', () => {
      helpers.seedTestDatabase(
        db,
        testUsers,
        testArticles,
        testComments,
      )
    })
    const newComment = {
      text: 'Test Comment',
      user_id: testUsers[0].id,
      article_id: testArticles[0].id,
    }

    it('Responds 201 and the new comment', () => {
      return supertest(app)
        .post('/api/comments')
        .send(newComment)
        .expect(201)
        .expect(newComment)
    })
  })
})