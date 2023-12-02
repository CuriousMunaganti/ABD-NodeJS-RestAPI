const planService = require('../../services/plan.service')
const logger = require('../../logger/logger')
const etag = require('etag')
const { publishToQueue } = require('../../services/rabbitMQ')

const getPlan = async (req, res) => {
    logger.info(`Handling ${req.method} for ${req.originalUrl}`)
    const key = req.params.id
    try {
        const data = await planService.getPlan(key)
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ "errorMessage": "Plan not found" })
        }
    } catch (error) {
        res.status(503).json({ "errorMessage": "Serive currently unavailable" })
    }
}

const setPlan = async (req, res) => {
    logger.info(`Handling ${req.method} for ${req.originalUrl}`)
    logger.info(`Payload is, `, req.body)
    try {
        const isPlanExists = await planService.getPlan(req.body.objectId)
        if (isPlanExists) {
            res.status(400).json({ "errorMessage": "Plan already exists" })
            return
        }
        const data = await planService.savePlan(req.body)
        if (data) {
            const message = {
                type: "PUT",
                document: data
            }
            await publishToQueue(message)
            res.status(201).json(data)
        }
    } catch (error) {
        logger.error("Unable to publish to RMQ", error)
        res.status(503).json({ "errorMessage": "Serive currently unavailable" })
    }
}

const deletPlan = async (req, res) => {
    logger.info(`Handling ${req.method} for ${req.originalUrl}`)
    const key = req.params.id
    try {
        const plan = await planService.getPlan(key)
        if (plan) {
            const data = await planService.deletePlan(plan)
            if (data.deletedCount == 1){
                const message = {
                    type: "DELETE",
                    document: plan
                }
                await publishToQueue(message)
            }
            res.status(204).json(data)
        } else {
            res.status(404).json({ "errorMessage": "Plan not found" })
        }
    } catch (error) {
        console.error(error)
        res.status(503).json({ "errorMessage": "Serive currently unavailable" })
    }
}

const getAllPlan = async (req, res) => {
    logger.info(`Handling ${req.method} for ${req.originalUrl}`)
    try {
        const data = await planService.getAllPlans()
        res.status(200).json({
            message: data
        })
    } catch (error) {
        res.status(503)
    }
}

const updatePlan = async (req, res) => {
    const key = req.params.id
    try {
        const existingPlan = await planService.getPlan(key)
        if (existingPlan) {
            const receivedEtag = req.headers['if-match'];
            const newEtag = etag(JSON.stringify(existingPlan))
            logger.info(`Etags ${receivedEtag}::${newEtag}`)
            if (receivedEtag !== newEtag) {
                res.status(412).json({ error: "Resource state might have changed or ETag might be wrong" })
                return
            }

            const data = await planService.updatePlan(req.body)

            const message = {
                type: "PUT",
                document: data
            }
            await publishToQueue(message)

            res.setHeader('ETag', etag(JSON.stringify(req.body)))
            res.status(200).json(req.body)
        } else {
            res.status(404).json({ "errorMessage": "Plan not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(503).json({ "errorMessage": "Serive currently unavailable" })
    }
}

const addLinkedPlanServices = async (req, res) => {
    const key = req.params.id
    try {
        const existingPlan = await planService.getPlan(key)
        if (existingPlan) {
            const receivedEtag = req.headers['if-match'];
            const newEtag = etag(JSON.stringify(existingPlan))
            logger.info(`Etags ${receivedEtag}::${newEtag}`)
            if (receivedEtag !== newEtag) {
                res.status(412).json({ error: "Resource state might have changed or ETag might be wrong" })
                return
            }

            const linkedPlanServicesMap = {};

            for (const linkedPlanService of existingPlan.linkedPlanServices) {
                linkedPlanServicesMap[linkedPlanService.objectId] = linkedPlanService
            }

            for (const linkedPlanService of req.body.linkedPlanServices) {
                if (!linkedPlanServicesMap[linkedPlanService.objectId]) {
                    existingPlan.linkedPlanServices.push(linkedPlanService);
                }
            }
            
            const updatedPlan = await planService.updatePlan(existingPlan)
            const message = {
                type: "PUT",
                document: updatedPlan
            }
            await publishToQueue(message)
            res.setHeader('ETag', etag(JSON.stringify(updatedPlan)))
            res.status(200).json(updatedPlan)
        } else {
            res.status(404).json({ "errorMessage": "Plan not found" })
        }
    } catch (error) {
        console.error(error)
        res.status(503).json({ "errorMessage": "Serive currently unavailable" })
    }
}

module.exports = {
    getAllPlan: getAllPlan,
    getPlan: getPlan,
    setPlan: setPlan,
    deletPlan: deletPlan,
    updatePlan: updatePlan,
    addLinkedPlanServices: addLinkedPlanServices
};