const express = require('express');
const plansController = require('../controllers/plan.controller');
const { validatePlan } = require('../middleware/validators');
const plansRouter = express.Router();

plansRouter.get('/:id', plansController.getPlan);
plansRouter.post('/', validatePlan, plansController.setPlan);
plansRouter.delete('/:id', plansController.deletPlan);

module.exports = {
    plansRouter
}