import { describe, it } from 'node:test';
import { ok, strictEqual } from 'node:assert';
import { httpRequest, requestAuth, requestAuthToken } from './helpers/httpHelper.mjs';

describe('API Auth Test Suite', async () => {
  it('Test success login', async (t) => {
    const response = await requestAuth({ email: 'requester@mail.com', password: '123', signal: t.signal });
    strictEqual(response.status, 201);
    ok(response.data.authToken);
  });

  it('Test invalid credentials login', async (t) => {
    const response = await requestAuth({ email: 'requester@mail.com', password: '', signal: t.signal });
    strictEqual(response.status, 401);
    ok(response.data.error);
  });

  it('Load user infor after logged', async (t) => {
    const loginToken = await requestAuthToken('requester@mail.com', t);
    const response = await httpRequest({
      method: 'GET',
      path: '/me',
      token: loginToken,
      signal: t.signal,
    });
    strictEqual(response.status, 200);
    ok(response.data.role);
  });
});
