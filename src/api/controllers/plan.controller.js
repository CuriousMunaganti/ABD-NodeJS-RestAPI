const redis = require('../../datastore/redis')
const logger = require('../../logger/logger')

const getAllPlan = async (req, res) => {
    logger.info(`Handling ${req.method} for ${req.originalUrl}`)
    try{
        const data = await redis.getAllPlans()
        res.status(200).json({
            message: data
        })
    }catch(error){
        res.status(503)
    }
    
}

const getPlan = async (req, res) => {
    logger.info(`Handling ${req.method} for ${req.originalUrl}`)
    try{
        const data = await redis.getPlan()
        res.status(200).json({
            message: data
        })
    }catch(error){
        res.status(503)
    }
}

const setPlan = async (req, res) => {
    logger.info(`Handling ${req.method} for ${req.originalUrl}`)
    try{
        const data = await redis.setPlan()
        res.status(200).json({
            message: data
        })
    }catch(error){
        res.status(503)
    }
}

const deletPlan = async (req, res) => {
    logger.info(`Handling ${req.method} for ${req.originalUrl}`)
    try{
        const data = await redis.deletePlan()
        res.status(200).json({
            message: data
        })
    }catch(error){
        res.status(503)
    }
}

module.exports = {
    getAllPlan:getAllPlan,
    getPlan: getPlan,
    setPlan: setPlan,
    deletPlan: deletPlan
};