const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const healthzRouter = require('./api/routes/healthz.routes')
app.use(bodyParser.json())

app.use('/v1/healthz', healthzRouter)

module.exports = app