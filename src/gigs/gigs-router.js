const express = require('express')
const path = require('path')
const GigsService = require('./gigs-service')

const gigsRouter = express.Router()
const jsonParser = express.json()

gigsRouter
  .route('/')
  .get((req, res, next) => {
    GigsService.getAllGigs(req.app.get('db'))
      .then(gigs => {
        res.json(GigsService.serializeGigs(gigs))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { gig_title, description, location, price, gig_date } = req.body
    const newGig = { gig_title, description, location, price, gig_date }

    for (const [key, value] of Object.entries(newGig)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }
    GigsService.insertGig(
      req.app.get('db'),
      newGig
    )
      .then(gig => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${gig.id}`))
          .json(GigsService.serializeGig(gig))
      })
      .catch(next)      
  })

gigsRouter
  .route('/:gig_id')
    .all((req, res, next) => {
      GigsService.getGigById(
        req.app.get('db'),
        req.params.gig_id
      )
        .then(gig => {
          if (!gig) {
            return res.status(404).json({
              error: { message: `Gig does not exist` }
            })
          }
          res.gig = gig
          next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
      res.json(GigsService.serializeGig(res.gig))
    })
    .delete((req, res, next) => {
      GigsService.deleteGig(
        req.app.get('db'),
        req.params.gig_id
      )
        .then(() => {
          res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
      const { gig_title, description, location, price, gig_date } = req.body
      const gigToUpdate = { gig_title, description, location, price, gig_date }

      const numberOfValues = Object.values(gigToUpdate).filter(Boolean).length
      if (numberOfValues === 0) {
        return res.status(400).json({
          error: { message: `Request body must contain at least one of the following: gig_title, description, location, price, and/or gig_date` } 
        })
      }
      GigsService.updateGig(
        req.app.get('db'),
        req.params.gig_id,
        gigToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })

module.exports = gigsRouter