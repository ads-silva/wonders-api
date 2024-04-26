import { describe, it, before, after } from 'node:test';
import { strictEqual } from 'node:assert';
import { httpRequest, requestAuth } from './helpers/httpHelper.mjs';
import { getSequelize } from '../sequelize/index.mjs';
import { reservationMock } from './mock/reservationMock.mjs';

let token = '';
let reservationOrderId = '';
describe('API Reservation Test Suite', async (t) => {
  before(async () => {
    const response = await requestAuth({ email: 'requester@mail.com', password: '123', signal: t.signal });
    token = response.data.authToken;
  });

  after(() => {
    getSequelize().close();
  });

  it('Create a new request with one product', async (t) => {
    const response = await httpRequest({
      method: 'POST',
      path: '/reservation',
      token,
      signal: t.signal,
      payload: reservationMock,
    });

    reservationOrderId = response.data.id;
    strictEqual(response.status, 201);
    strictEqual(response.data.status, 'pending');
  });

  it('Should return a reservationOrder detailed with products', async (t) => {
    const response = await httpRequest({
      method: 'GET',
      path: `/reservation/${reservationOrderId}`,
      token,
      signal: t.signal,
    });

    strictEqual(response.status, 200);
    strictEqual(response.data.products.length > 0, true);
  });

  it('Should return 400 no balance when create a new reservation', async (t) => {
    const response = await httpRequest({
      method: 'POST',
      path: '/reservation',
      token,
      signal: t.signal,
      payload: {
        ...reservationMock,
        products: [
          { productId: 1, amount: 50 }, // Original is 30
        ],
      },
    });

    strictEqual(response.status, 400);
    strictEqual(response.data.message, 'No balance for this operation');
  });

  it('Test find a list os reservationOrders', async (t) => {
    const response = await httpRequest({
      method: 'GET',
      path: '/reservation',
      token,
      signal: t.signal,
    });

    strictEqual(response.status, 200);
    strictEqual(response.data.length > 0, true);
  });
});
