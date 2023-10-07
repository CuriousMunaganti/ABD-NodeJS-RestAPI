const logger = require("../../logger/logger")
const schema = require("../../schemas/plan.schema.json")
const validate = require('jsonschema').validate

const validatePlan = async (req, res, next) => {
    logger.info("Validating the incoming JSON payload")
    var result = validate(req.body, schema)
    if(result.errors.length > 0){
        const formattedErrors = result.errors.map((error) => ({
            errorProperty: error.argument,
            errorMessage: error.message
        }));
        logger.error("Incoming JSONSchema validation failed", formattedErrors)
        res.status(400).json(formattedErrors)
        return
    }
    next()
}

module.exports ={
    validatePlan: validatePlan
}