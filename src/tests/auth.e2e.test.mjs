import { describe, it } from 'node:test';
import { ok, strictEqual } from 'node:assert';
import { requestAuth } from './helpers/httpHelper.mjs';

describe('API Auth Test Suite', async () => {
  it('Test success login', async () => {
    const response = await requestAuth('requester@mail.com', '123');
    strictEqual(response.status, 201);
    ok(response.data.authToken);
  });

  it('Test invalid credentials login', async () => {
    const response = await requestAuth('requester@mail.com', '');
    strictEqual(response.status, 401);
    ok(response.data.error);
  });
});
