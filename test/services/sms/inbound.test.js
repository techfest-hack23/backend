const assert = require('assert');
const app = require('../../../src/app');

describe('\'sms/inbound\' service', () => {
  it('registered the service', () => {
    const service = app.service('sms/inbound');

    assert.ok(service, 'Registered the service');
  });
});
