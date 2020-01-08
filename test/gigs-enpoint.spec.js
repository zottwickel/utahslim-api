const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Gigs Endpoints', function() {
  let db

  const testGigs = helpers.makeGigsArray()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })
  
  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.truncateTables(db))

  afterEach('cleanup', () => helpers.truncateTables(db))

  describe(`GET /api/gigs`, () => {
    beforeEach('insert gigs', () => 
      helpers.seedGigs(db, testGigs)
    )

    it('Responds 200 and all gigs', () => {
      return supertest(app)
        .get('/api/gigs')
        .expect(200)
        .expect(testGigs)
    })
  })

  describe(`POST /api/gigs`, () => {
    const newGig = {
      gig_title: 'Test Event 4',
      description: 'This is a test event.',
      location: 'salt lake city',
      price: '0.00',
      gig_date: new Date().toISOString()
    }

    it('Responds 201 and the new gig', () => {
      return supertest(app)
        .post('/api/gigs')
        .send(newGig)
        .expect(201)
        .expect(res => {
          expect(res.body.gig_title).to.eql(newGig.gig_title)
          expect(res.body.description).to.eql(newGig.description)
          expect(res.body.location).to.eql(newGig.location)
          expect(res.body.price).to.eql(newGig.price)
          expect(res.body.gig_date).to.eql(newGig.gig_date)
        })
    })
  })

  describe(`DELETE /api/gigs/:gig_id`, () => {
    beforeEach('insert gigs', () => 
      helpers.seedGigs(db, testGigs)
    )

    it('Responds with 204', () => {
      return supertest(app)
        .delete(`/api/gigs/${testGigs[0].gig_id}`)
        .expect(204)
    })
  })
})