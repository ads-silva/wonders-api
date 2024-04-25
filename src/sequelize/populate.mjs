import { startSequelizeConnection, getModels } from './index.mjs';
import { productSeed, userSeed } from './seeds.mjs';

const populate = async () => {
  await startSequelizeConnection(true);

  console.log('Will rewrite the mariadb example database, adding some dummy data.');

  await getModels().user.bulkCreate(userSeed);
  await getModels().product.bulkCreate(productSeed);

  console.log('Done!');
};

populate();
