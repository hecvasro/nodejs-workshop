const routes = require('./app/routes');
const Store = require('./app/store');
const {counter,store} = Store;

/**
 * NodeJS Keynote API for Creating Plans.
 * - [X] Create Plan
 * - [X] Get Plan
 * - [X] Add Task to Plan
 * - [X] Update Task from Plan
 * - [X] Get Task
 * - [X] Remove Task from Plan
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (request, response) => {
  response.send('NodeJS Keynote');
});

routes(app);

// ==============================================
// PLAN
// ==============================================
// GET PLAN
app.get('/plans/:planId', (request, response) => {
  const planId = parseInt(request.params.planId);
  const plan = store.find((plan) => plan.id === planId);
  if (plan) {
    response.json(plan);
  } else {
    response.status(404)
            .send('Sorry, can\'t find that.');
  }
});

// ==============================================
// TASK
// ==============================================
// CREATE TASK
app.post('/plans/:planId/tasks', (request, response) => {
  const planId = parseInt(request.params.planId);
  const plan = store.find((plan) => plan.id === planId);
  if (!plan) {
    response.status(404)
            .send('Sorry, can\'t find that.');
    return;
  }
  const task = {
    id: counter.tasks,
    name: request.body.name,
    estimate: request.body.estimate
  };
  plan.tasks.push(task);
  counter.tasks += 1;
  store[store.indexOf((plan) => plan.id === planId)] = plan;
  response.json(task);
});
// UPDATE TASK
app.patch('/plans/:planId/tasks/:taskId', (request, response) => {
  const planId = parseInt(request.params.planId);
  const plan = store.find((plan) => plan.id === planId);
  const planIndex = store.indexOf(plan);
  if (!plan) {
    response.status(404)
            .send('Sorry, can\'t find that.');
    return;
  }
  const taskId = parseInt(request.params.taskId);
  let task = plan.tasks.find((task) => task.id === taskId);
  const taskIndex = plan.tasks.indexOf(task);
  if (!task) {
    response.status(404)
            .send('Sorry, can\'t find that.');
    return;
  }
  task = {...task, ...request.body};

  plan.tasks[taskIndex] = task;
  store[planIndex] = plan;

  response.json(task);
});
// GET TASK
app.get('/plans/:planId/tasks/:taskId', (request, response) => {
  const planId = parseInt(request.params.planId);
  const plan = store.find((plan) => plan.id === planId);
  if (!plan) {
    response.status(404)
            .send('Sorry, can\'t find that.');
    return;
  }
  const taskId = parseInt(request.params.taskId);
  const task = plan.tasks.find((task) => task.id === taskId);
  if (!task) {
    response.status(404)
            .send('Sorry, can\'t find that.');
    return;
  }
  response.json(task);
});
// DELETE TASK
app.delete('/plans/:planId/tasks/:taskId', (request, response) => {
  const planId = parseInt(request.params.planId);
  const plan = store.find((plan) => plan.id === planId);
  const planIndex = store.indexOf(plan);
  if (!plan) {
    response.status(404)
            .send('Sorry, can\'t find that.');
    return;
  }
  const taskId = parseInt(request.params.taskId);
  const task = plan.tasks.find((task) => task.id === taskId);
  const taskIndex = plan.tasks.indexOf(task);
  if (!task) {
    response.status(404)
            .send('Sorry, can\'t find that.');
    return;
  }

  plan.tasks.splice(taskIndex, 1);

  store[planIndex] = plan;

  response.status(204)
          .send('Task deleted!');
});

app.listen(port, () => console.log(`NodeJS Keynote API is running on port ${port}`));
