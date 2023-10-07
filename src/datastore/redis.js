const redis = require("redis");
const logger = require("../logger/logger");
const { cli } = require("winston/lib/winston/config");
const client = redis.createClient();

const connect = async () => {
    await client.connect()
}
const getAllPlans = async() =>{
    logger.info("Getting all plans...")
    return "getAllPlan"
}
const getPlan = async (key) => {
    logger.info(`Getting data for ${key}`)
    try{
        const data = await client.get(key);
        return JSON.parse(data)
    }catch(error){
        logger.error(`Failed getting data for ${key}`, error);
    }
}
const setPlan = async (key, plan) => {
    try{
        const data = await client.set(key, JSON.stringify(plan));
        logger.info("Inserted data in redis: ", data);
        return data;
    }catch(error){
        logger.error("Failed inserting data:", error);
    }
}
const deletePlan = async (key) => {
    try{
        const data = await client.del(key);
        return data;
    }catch(error){
        logger.error("Failed delete from redis:", error);
    }
}

module.exports = {
    connect: connect,
    getAllPlans: getAllPlans,
    getPlan: getPlan,
    setPlan: setPlan,
    deletePlan: deletePlan,
    client: client
};