const assert = require('assert');
const app = require('../../../src/app');

describe('\'sms/outbound\' service', () => {
  it('registered the service', () => {
    const service = app.service('sms/outbound');

    assert.ok(service, 'Registered the service');
  });
});
