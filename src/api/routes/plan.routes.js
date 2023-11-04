const express = require('express');
const plansController = require('../controllers/plan.controller');
const { validatePlan } = require('../middleware/validators');
const plansRouter = express.Router();

plansRouter.get('/:id', plansController.getPlan);
plansRouter.post('/', validatePlan, plansController.setPlan);
plansRouter.delete('/:id', plansController.deletPlan);
plansRouter.put('/:id', validatePlan, plansController.updatePlan);
plansRouter.patch('/:id', plansController.addLinkedPlanServices);

module.exports = {
    plansRouter
}