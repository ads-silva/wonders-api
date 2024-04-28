import { describe, it, before, after } from 'node:test';
import { strictEqual } from 'node:assert';
import { httpRequest, requestAuthToken } from './helpers/httpHelper.mjs';
import { getSequelize } from '../sequelize/index.mjs';
import { reservationMock } from './mock/reservationMock.mjs';

let tokenRequester = '';
let tokenManager = '';
describe('API Reservation Test Suite', async (t) => {
  before(async () => {
    tokenRequester = await requestAuthToken('requester@mail.com', t);
    tokenManager = await requestAuthToken('manager@mail.com', t);
  });

  after(() => {
    getSequelize().close();
  });

  it('Create a new request with one product', async (t) => {
    const response = await httpRequest({
      method: 'POST',
      path: '/reservation',
      token: tokenRequester,
      signal: t.signal,
      payload: reservationMock,
    });
    strictEqual(response.status, 201);
    strictEqual(response.data.status, 'pending');
  });

  it('Should return a reservationOrder detailed with products', async (t) => {
    const responseCreate = await httpRequest({
      method: 'POST',
      path: '/reservation',
      token: tokenRequester,
      signal: t.signal,
      payload: reservationMock,
    });
    const reservationOrderId = responseCreate.data.id;
    const response = await httpRequest({
      method: 'GET',
      path: `/reservation/${reservationOrderId}`,
      token: tokenRequester,
      signal: t.signal,
    });

    strictEqual(response.status, 200);
    strictEqual(response.data.products.length > 0, true);
  });

  it('Should return 400 no balance when create a new reservation', async (t) => {
    const response = await httpRequest({
      method: 'POST',
      path: '/reservation',
      token: tokenRequester,
      signal: t.signal,
      payload: {
        ...reservationMock,
        products: [
          { productId: 1, amount: 20000 }, // Original is 30
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
      token: tokenRequester,
      signal: t.signal,
    });

    strictEqual(response.status, 200);
    strictEqual(response.data.length > 0, true);
  });

  it('Should return with status rejected', async (t) => {
    const responseCreate = await httpRequest({
      method: 'POST',
      path: '/reservation',
      token: tokenRequester,
      signal: t.signal,
      payload: reservationMock,
    });

    const reservationId = responseCreate.data.id;
    const response = await httpRequest({
      method: 'PATCH',
      path: `/reservation/${reservationId}/reject`,
      token: tokenManager,
      signal: t.signal,
    });

    strictEqual(response.status, 200);
    strictEqual(response.data.status, 'rejected');
  });

  it('Should return 400 if invalid status for reject', async (t) => {
    const responseCreate = await httpRequest({
      method: 'POST',
      path: '/reservation',
      token: tokenRequester,
      signal: t.signal,
      payload: reservationMock,
    });

    const reservationId = responseCreate.data.id;
    await httpRequest({
      method: 'PATCH',
      path: `/reservation/${reservationId}/accept`,
      token: tokenManager,
      signal: t.signal,
    });

    const response = await httpRequest({
      method: 'PATCH',
      path: `/reservation/${reservationId}/reject`,
      token: tokenManager,
      signal: t.signal,
    });

    strictEqual(response.status, 400);
  });

  it('Should return 404 if not found', async (t) => {
    const response = await httpRequest({
      method: 'PATCH',
      path: `/reservation/3123/reject`,
      token: tokenManager,
      signal: t.signal,
    });

    strictEqual(response.status, 404);
  });

  it('Should return with status available', async (t) => {
    const responseCreate = await httpRequest({
      method: 'POST',
      path: '/reservation',
      token: tokenRequester,
      signal: t.signal,
      payload: reservationMock,
    });

    const reservationId = responseCreate.data.id;
    const response = await httpRequest({
      method: 'PATCH',
      path: `/reservation/${reservationId}/accept`,
      token: tokenManager,
      signal: t.signal,
    });

    strictEqual(response.status, 200);
    strictEqual(response.data.status, 'available');
  });

  it('Should return with status completed', async (t) => {
    const responseCreate = await httpRequest({
      method: 'POST',
      path: '/reservation',
      token: tokenRequester,
      signal: t.signal,
      payload: reservationMock,
    });

    const reservationId = responseCreate.data.id;
    await httpRequest({
      method: 'PATCH',
      path: `/reservation/${reservationId}/accept`,
      token: tokenManager,
      signal: t.signal,
    });

    const response = await httpRequest({
      method: 'PATCH',
      path: `/reservation/${reservationId}/deliver`,
      token: tokenManager,
      signal: t.signal,
    });
    strictEqual(response.status, 200);
    strictEqual(response.data.status, 'completed');
  });

  it('Should return 404 if deliver a fake reservation id', async (t) => {
    const response = await httpRequest({
      method: 'PATCH',
      path: `/reservation/21322/deliver`,
      token: tokenManager,
      signal: t.signal,
    });
    strictEqual(response.status, 404);
  });
});
