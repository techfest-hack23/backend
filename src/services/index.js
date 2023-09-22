const users = require('./users/users.service.js');
const clients = require('./clients/clients.service.js');
const providers = require('./providers/providers.service.js');
const messages = require('./messages/messages.service.js');
const comments = require('./comments/comments.service.js');
const tasks = require('./tasks/tasks.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(clients);
  app.configure(providers);
  app.configure(messages);
  app.configure(comments);
  app.configure(tasks);
};
