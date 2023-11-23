const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/loginRouter')
const blogsRouter = require('./controllers/blogsRouter')
const casesRouter = require('./controllers/casesRouter')
const uploadRouter = require('./controllers/uploadRouter')
const bodyParser = require('body-parser')
const evidenceRouter = require('./controllers/evidenceRouter')
const servicesRouter = require('./controllers/servicesRouter')

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('build'))

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/cases', casesRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/evidence', evidenceRouter)
app.use('/api/services', servicesRouter)

module.exports = app
