const logger = require("../../logger/logger")

const validatePlan = async (req, res, next) => {
    logger.info("In payload validator function")
    next();
}


module.exports ={
    validatePlan: validatePlan
}