import { describe, it, before, after } from 'node:test';
import { strictEqual } from 'node:assert';
import { httpRequest, requestAuth } from './utils/httpUtil.mjs';
import { getModels } from '../sequelize/index.mjs';

let token = '';
describe('API Product Test Suite', async () => {
  before(async () => {
    const response = await requestAuth('requester@mail.com', '123');
    token = response.data.authToken;
  });

  it('Test find a list os products', async () => {
    await getModels().product.bulkCreate([
      {
        name: 'pencil',
        description: 'pencil yellow',
        price: '1.20',
      },
    ]);
    const response = await httpRequest('GET', '/product', undefined, token);
    console.log(response);
    strictEqual(response.status, 200);
    strictEqual(response.data.size, 1);
  });
});
