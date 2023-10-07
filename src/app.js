const express = require('express')
const app = express()
app.use(express.json())
const healthzRouter = require('./api/routes/healthz.routes')
const { plansRouter } = require('./api/routes/plan.routes')
app.set("etag", "strong")
app.use('/v1/healthz', healthzRouter)
app.use('/v1/plan', plansRouter)

module.exports = app