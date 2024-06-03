require('dotenv').config()

const express = require('express')
const { connectDB } = require('./src/config/db')
const portatilesRouter = require('./src/api/routes/portatil')

const app = express()
connectDB()

app.use(express.json())

app.use('/api/v1/portatiles', portatilesRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3001, () => {
  console.log('http://localhost:3001')
})
