// Initializes the `sms/inbound` service on path `/sms/inbound`
const { Inbound } = require('./inbound.class');
const hooks = require('./inbound.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sms/inbound', new Inbound(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sms/inbound');

  service.hooks(hooks);
};
