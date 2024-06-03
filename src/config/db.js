const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('BBDD funcionando')
  } catch (error) {
    console.log('Error al conectar con la BBDD')
  }
}

module.exports = { connectDB }
