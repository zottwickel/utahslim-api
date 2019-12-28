const xss = require('xss')

const GigsService = {
  getAllGigs(db) {
    return db
      .select('*')
      .from('gigs')
  },
  getGigById(db, id) {
    return db
      .select('*')
      .from('gigs')
      .where('id', id)
      .first()
  },
  insertGig(db, newGig) {
    return db
      .insert(newGig)
      .into('gigs')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  updateGig(db, id, newGig) {
    return db('gigs')
      .where({ id })
      .update(newGig)
  },
  deleteGig(db, id) {
    return db('gigs')
      .where({ id })
      .delete()
  },
  serializeGigs(gigs) {
    return gigs.map(this.serializeGig)
  },
  serializeGig(gig) {
    return {
      id: gig.id,
      description: xss(gig.description),
      gig_title: xss(gig.gig_title),
      location: xss(gig.location),
      price: gig.price,
      gig_date: gig.gig_date
    }
  },
}

module.exports = GigsService