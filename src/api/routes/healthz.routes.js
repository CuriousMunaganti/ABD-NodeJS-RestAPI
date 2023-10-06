const healthzController = require('../controllers/healthz.controller');
const express = require('express');
const healthzRouter = express.Router();

healthzRouter.get('/', healthzController.ping);

module.exports = healthzRouter;
