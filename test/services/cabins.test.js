const assert = require('assert');
const app = require('../../src/app');

describe('\'cabins\' service', () => {
  it('registered the service', () => {
    const service = app.service('cabins');

    assert.ok(service, 'Registered the service');
  });
});
