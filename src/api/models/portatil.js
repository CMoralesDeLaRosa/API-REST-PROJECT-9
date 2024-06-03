const mongoose = require('mongoose')

const portatilSchema = new mongoose.Schema(
  {
    portatilName: { type: String, required: true },
    portatilPrice: { type: String, required: true },
    portatilImg: { type: String, required: true }
  },
  { timestamps: true, collection: 'portatiles' }
)

const Portatil = mongoose.model('portatiles', portatilSchema, 'portatiles')

module.exports = Portatil
