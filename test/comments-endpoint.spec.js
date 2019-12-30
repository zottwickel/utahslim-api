const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Comments Endpoints', function() {
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
    beforeEach('insert articles', () => 
      helpers.seedTestDatabase(
        db,
        testUsers,
        testArticles,
        testComments,
      )
    )
    const newComment = {
      text: 'Test Comment',
      article_id: 'a3e47496-5f5d-4ecd-9d0b-222c464199ba',
      user_id: '955f6c01-a9f6-44bb-a7fd-75d1933f922e',
    }

    it('Responds 201 and the new comment', () => {
      return supertest(app)
        .post('/api/comments')
        .send(newComment)
        .then(res => {
          expect(res.body.text).to.eql(newComment.text)
        })
    })
  })
})