const Plan = require("./../api/models/plan")

const savePlan = async (planObject) =>{
    const plan = new Plan(planObject);

    const res = await plan.save();

    return res;
}


const getPlan = async (objectId) => {

    const plan = await Plan.findOne({
        objectId: objectId
    })
    return plan;

}


const deletePlan = async (plan) => {

    const deletedPlan = await Plan.deleteOne({
        objectId: plan.objectId
    });
    return deletedPlan;
}

const updatePlan = async (plan) => {

    const updatedPlan = await Plan.findOneAndUpdate({ objectId: plan.objectId}, plan, { new:true })
    return updatedPlan;
}

module.exports = { savePlan, getPlan, deletePlan, updatePlan }