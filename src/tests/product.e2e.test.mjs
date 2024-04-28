import { describe, it, before, after } from 'node:test';
import { strictEqual } from 'node:assert';
import { httpRequest, requestAuthToken } from './helpers/httpHelper.mjs';
import { getSequelize } from '../sequelize/index.mjs';

let token = '';
describe('API Product Test Suite', async (t) => {
  before(async () => {
    token = await requestAuthToken('requester@mail.com', t);
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

  it('Test find a list os products with reserved amounts', async (t) => {
    const managerToken = await requestAuthToken('manager@mail.com', t);
    const response = await httpRequest({
      method: 'GET',
      path: '/product',
      token: managerToken,
      signal: t.signal,
    });

    strictEqual(response.status, 200);
    strictEqual(response?.data[0].amountReserved >= 0, true);
  });

  it('List os products should return 403 for admin role', async (t) => {
    const adminToken = await requestAuthToken('admin@mail.com', t);
    const response = await httpRequest({
      method: 'GET',
      path: '/product',
      token: adminToken,
      signal: t.signal,
    });

    strictEqual(response.status, 403);
  });
});
