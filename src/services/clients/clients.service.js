// Initializes the `clients` service on path `/clients`
const { Clients } = require('./clients.class');
const hooks = require('./clients.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/clients', new Clients(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('clients');

  service.hooks(hooks);
};
