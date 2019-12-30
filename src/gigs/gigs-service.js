const xss = require('xss')

const GigsService = {
  getAllGigs(db) {
    return db
      .select('*')
      .from('gigs')
  },
  getGigById(db, gig_id) {
    return db
      .select('*')
      .from('gigs')
      .where('gig_id', gig_id)
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
  updateGig(db, gig_id, newGig) {
    return db('gigs')
      .where({ gig_id })
      .update(newGig)
  },
  deleteGig(db, gig_id) {
    return db('gigs')
      .where({ gig_id })
      .delete()
  },
  serializeGigs(gigs) {
    return gigs.map(this.serializeGig)
  },
  serializeGig(gig) {
    return {
      gig_id: gig.gig_id,
      description: xss(gig.description),
      gig_title: xss(gig.gig_title),
      location: xss(gig.location),
      price: gig.price,
      gig_date: gig.gig_date
    }
  },
}

module.exports = GigsService