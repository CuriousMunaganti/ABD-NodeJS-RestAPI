const redis = require('../../services/redis')
const logger = require('../../logger/logger')
const etag = require('etag')

const getPlan = async (req, res) => {
    logger.info(`Handling ${req.method} for ${req.originalUrl}`)
    const key = req.params.id
    try {
        const data = await redis.getPlan(key)
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
        const data = await redis.setPlan(req.body.objectId, req.body)
        if (data === "OK") {
            res.status(201).json(req.body)
        }
    } catch (error) {
        res.status(503).json({ "errorMessage": "Serive currently unavailable" })
    }
}

const deletPlan = async (req, res) => {
    logger.info(`Handling ${req.method} for ${req.originalUrl}`)
    const key = req.params.id
    try {
        const data = await redis.deletePlan(key)
        if (data) {
            res.status(204).json(data)
        } else {
            res.status(404).json({ "errorMessage": "Plan not found" })
        }
    } catch (error) {
        res.status(503).json({ "errorMessage": "Serive currently unavailable" })
    }
}

const getAllPlan = async (req, res) => {
    logger.info(`Handling ${req.method} for ${req.originalUrl}`)
    try {
        const data = await redis.getAllPlans()
        res.status(200).json({
            message: data
        })
    } catch (error) {
        res.status(503)
    }
}

const updatePlan = async (req, res) => {
    const key = req.params.id
    const receivedEtag = req.headers['if-match'];
    const newEtag = etag(JSON.stringify(req.body))
    if(receivedEtag === newEtag){
        res.setHeader('ETag', newEtag)
        res.status(304).send()
        return
    }

    try {
        const existingPlan = await redis.getPlan(key)
        if (existingPlan) {
            const data = await redis.setPlan(req.body.objectId, req.body)
            if (data === "OK") {
                res.setHeader('ETag', etag(JSON.stringify(req.body)))
                res.status(200).json(req.body)
            }
        } else {
            res.status(404).json({ "errorMessage": "Plan not found" })
        }
    } catch (error) {
        res.status(503).json({ "errorMessage": "Serive currently unavailable" })
    }
}

module.exports = {
    getAllPlan: getAllPlan,
    getPlan: getPlan,
    setPlan: setPlan,
    deletPlan: deletPlan,
    updatePlan: updatePlan
};