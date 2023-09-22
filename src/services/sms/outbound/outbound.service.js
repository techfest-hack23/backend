// Initializes the `sms/outbound` service on path `/sms/outbound`
const { Outbound } = require('./outbound.class');
const hooks = require('./outbound.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sms/outbound', new Outbound(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sms/outbound');

  service.hooks(hooks);
};
