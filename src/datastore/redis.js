const redis = require("redis");
const logger = require("../logger/logger");
const client = redis.createClient();

const connect = async () => {
    logger.info("Connecting to redis client...")
    return "connect to redis"
}
const getAllPlans = async() =>{
    logger.info("Getting all plans...")
    return "getAllPlan"
}
const getPlan = async () => {
    logger.info("Getting a plan...")
    return "getPlan"
}
const setPlan = async () => {
    logger.info("Setting a plan...")
    return "setPlan"
}
const deletePlan = async () => {
    logger.info("Deleting a plan...")
    return "deletePlan"
}

module.exports = {
    connect: connect,
    getAllPlans: getAllPlans,
    getPlan: getPlan,
    setPlan: setPlan,
    deletePlan: deletePlan
};