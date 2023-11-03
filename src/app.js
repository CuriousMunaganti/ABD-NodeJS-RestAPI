const express = require('express')
const app = express()
app.use(express.json())
const healthzRouter = require('./api/routes/healthz.routes')
const { plansRouter } = require('./api/routes/plan.routes')
const { authRouter } = require('./api/routes/auth.routes')
const { tokenValidator } = require('./api/middleware/validators')

app.set("etag", "strong")
app.use("/auth/", authRouter)
app.use('/v1/healthz', healthzRouter)
app.use('/v1/plan', tokenValidator, plansRouter)

module.exports = app