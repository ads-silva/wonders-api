import { describe, it } from 'node:test';
import { ok, strictEqual } from 'node:assert';
import { requestAuth } from './helpers/httpHelper.mjs';

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
});
