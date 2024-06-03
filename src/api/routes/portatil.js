const {
  insertManyPortatiles,
  getAllPortatiles,
  updatePortatil,
  deletePortatil,
  postPortatil
} = require('../controllers/portatil')

const portatilesRouter = require('express').Router()

portatilesRouter.post('/insert_many', insertManyPortatiles)
portatilesRouter.post('/', postPortatil)
portatilesRouter.get('/', getAllPortatiles)
portatilesRouter.put('/:id', updatePortatil)
portatilesRouter.delete('/:id', deletePortatil)

module.exports = portatilesRouter
