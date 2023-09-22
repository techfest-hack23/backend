// Initializes the `cabins` service on path `/cabins`
const { Cabins } = require('./cabins.class');
const hooks = require('./cabins.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cabins', new Cabins(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cabins');

  service.hooks(hooks);
};
