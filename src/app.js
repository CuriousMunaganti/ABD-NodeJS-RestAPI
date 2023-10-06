const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const healthzRouter = require('./api/routes/healthz.routes')
const { plansRouter } = require('./api/routes/plan.routes')
app.use(bodyParser.json())

app.use('/v1/healthz', healthzRouter)
app.use('/v1/plan', plansRouter)

module.exports = app