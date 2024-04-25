import { describe, it, before, after } from 'node:test';
import { strictEqual } from 'node:assert';
import { httpRequest, requestAuth } from './helpers/httpHelper.mjs';
import { getSequelize } from '../sequelize/index.mjs';

let token = '';
describe('API Product Test Suite', async (t) => {
  before(async () => {
    const response = await requestAuth({ email: 'requester@mail.com', password: '123', signal: t.signal });
    token = response.data.authToken;
  });

  after(() => {
    getSequelize().close();
  });

  it('Test find a list os products', async (t) => {
    const response = await httpRequest({
      method: 'GET',
      path: '/product',
      token,
      signal: t.signal,
    });

    strictEqual(response.status, 200);
    strictEqual(response.data.length > 1, true);
  });

  describe('Product Forbiden Test Suite', async (t) => {
    before(async () => {
      const response = await requestAuth({ email: 'admin@mail.com', password: '123', signal: t.signal });
      token = response.data.authToken;
    });

    it('List os products should return 403 for admin role', async (t) => {
      const response = await httpRequest({
        method: 'GET',
        path: '/product',
        token,
        signal: t.signal,
      });

      strictEqual(response.status, 403);
    });
  });
});
