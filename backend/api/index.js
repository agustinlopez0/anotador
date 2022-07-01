const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const subjects = require('./routes/subjects')
const events = require('./routes/events')
const nextClass = require('./routes/nextClass')

const app = express()
app.use( bodyParser.json() )
app.use(cors())

mongoose.connect(process.env.MONGO_URI, { userNewUrlParser: true, useUnifiedTopology: true })

app.use('/api/subjects', subjects)
app.use('/api/events', events)

module.exports = app
