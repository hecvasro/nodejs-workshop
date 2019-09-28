const counter = { plans: 1, tasks: 1 };
const store = [{id: 1000,name: 'Plan 01',tasks:[{id: 1000,name:'Task 01',estimate: 5}]}];
const data = [...store];

const store = {
  addPlan: (plan) => {
    plan.id = counter.plans;
    counter.plans += 1;
    data.push(plan);
    return plan;
  }
};

module.exports = store;
