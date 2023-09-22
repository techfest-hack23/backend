

const processInboundSms = require('../../../hooks/process-inbound-sms');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [processInboundSms()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
