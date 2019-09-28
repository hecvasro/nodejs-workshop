const Tasks = require('./controllers/tasks');

const routes = (app) => {
  app.post('/tasks', Tasks.create);
};
module.exports = routes;