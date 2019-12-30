const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Articles Endpoints', function () {
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

  describe(`GET /api/articles`, () => {
    beforeEach('insert articles', () => 
      helpers.seedTestDatabase(
        db,
        testUsers,
        testArticles,
        testComments,
      )
    )

    it('responds 200 and all articles', () => {
      const expectedArticles = testArticles.map(article => 
          helpers.makeExpectedArticle(
            testUsers,
            article,
            testComments,
          )
        )
        return supertest(app)
            .get('/api/articles')
            .expect(200)
            .expect(expectedArticles.reverse())
    })
  })

  describe(`GET /api/articles/:article_id`, () => {
    beforeEach('insert articles', () => 
      helpers.seedTestDatabase(
        db,
        testUsers,
        testArticles,
        testComments,
      )
    )

    it('responds 200 and an article', () => {
      const expectedArticle = helpers.makeExpectedArticle(
        testUsers,
        testArticles[0],
        testComments,
      )
      return supertest(app)
        .get(`/api/articles/${testArticles[0].id}`)
        .expect(200)
        .expect(expectedArticle)
    })
  })

  describe(`POST /api/articles`, () => {

    const newArticle = {
      title: 'Test Article',
      content: 'Test content.',
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString(),
      user_id: testUsers[0].id
    }

    beforeEach('insert articles', () => 
      helpers.seedTestDatabase(
        db,
        testUsers,
        testArticles,
        testComments,
      )
    )

    it('responds 201 and the article', () => {
      return supertest(app)
        .post('/api/articles')
        .send(newArticle)
        .expect(201)
        .expect(res => {
          expect(res.body.title).to.eql(newArticle.title)
          expect(res.body.content).to.eql(newArticle.content)
        })
    }) 
  })

  describe(`PATCH /api/articles/:article_id`, () => {
    const newArticle = {
      title: 'Test Article',
      content: 'Test content.',
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString(),
      user_id: testUsers[0].id
    }

    beforeEach('insert articles', () => 
      helpers.seedTestDatabase(
        db,
        testUsers,
        testArticles,
        testComments,
      )
    )

    it('Responds 204 on successful update', () => {
      return supertest(app)
        .patch(`/api/articles/${testArticles[0].id}`)
        .send(newArticle)
        .expect(204)
    })
  })

  describe(`DELETE /api/articles/:article_id`, () => {
    beforeEach('insert articles', () => 
      helpers.seedTestDatabase(
        db,
        testUsers,
        testArticles,
        testComments,
      )
    )

    it('Responds with 204', () => {
      return supertest(app)
        .delete(`/api/articles/${testArticles[0].id}`)
        .expect(204)
    })
  })
})