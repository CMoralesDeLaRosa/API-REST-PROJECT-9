const Portatil = require('../models/portatil')
const portatiles = require('../../../products.json')

const insertManyPortatiles = async (req, res, next) => {
  try {
    await Portatil.insertMany(portatiles.results)
    return res.status(201).json('Todos los portátiles en la BBDD')
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error al insertar los portátiles en la BBDD')
  }
}

const postPortatil = async (req, res, next) => {
  try {
    const newPortatil = new Portatil(req.body)

    const portatilSaved = await newPortatil.save()
    return res.status(201).json(portatilSaved)
  } catch (error) {
    return res.status(404).json('Error')
  }
}

const getAllPortatiles = async (req, res, next) => {
  try {
    const allPortatiles = await Portatil.find()
    return res.status(200).json(allPortatiles)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

const deletePortatil = async (req, res, next) => {
  try {
    const { id } = req.params
    const portatilDeleted = await Portatil.findByIdAndDelete(id)
    return res.status(200).json(portatilDeleted)
  } catch (error) {
    return res.status(404).json('Error')
  }
}

const updatePortatil = async (req, res, next) => {
  try {
    const { id } = req.params
    const newPortatil = new Portatil(req.body)
    newPortatil._id = id
    const updatedPortatil = await Portatil.findByIdAndUpdate(id, newPortatil, {
      new: true
    })
    return res.status(200).json(updatedPortatil)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

module.exports = {
  insertManyPortatiles,
  getAllPortatiles,
  updatePortatil,
  deletePortatil,
  postPortatil
}
