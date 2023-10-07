const redis = require("redis");
const logger = require("../logger/logger");
const { cli } = require("winston/lib/winston/config");
const client = redis.createClient();

const connect = async () => {
    await client.connect()
}

const getAllPlans = async () => {
    logger.info("Getting all plans...")
    return "getAllPlan"
}

const getPlan = async (key) => {
    logger.info(`Getting data for ${key}`)
    try {
        await pingClient();
        const data = await client.get(key);
        return JSON.parse(data)
    } catch (error) {
        logger.error(`Failed getting data for ${key}`, error);
        throw new Error(error);
    }
}

const setPlan = async (key, plan) => {
    try {
        const data = await client.set(key, JSON.stringify(plan));
        logger.info("Inserted data in redis: ", data);
        return data;
    } catch (error) {
        logger.error("Failed inserting data:", error);
        throw new Error(error);
    }
}

const deletePlan = async (key) => {
    try {
        await pingClient();
        const data = await client.del(key);
        return data;
    } catch (error) {
        logger.error("Failed delete from redis:", error);
        throw new Error(error);
    }
}

const pingClient = async() =>{
    try {
        logger.info("Pinging the redis server....")
        const pingResult = await client.ping();
        logger.info("Pinging the redis server successful", pingResult);
    } catch (error) {
        logger.error("Pinging the redis server Failed", error);
        throw new Error(error);
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