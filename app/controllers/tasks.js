const store = require('../store');

const create = (request, response) => {
  plan = {
    name: request.body.name,
    tasks: []
  };
  store.addPlan(plan);
  response.json(plan);
};

module.exports = {
  create
};
