import { getModels } from '../../sequelize/index.mjs';
import { userSeed, productSeed } from '../../sequelize/seeds.mjs';

const populate = async () => {
  console.log('Start populate...');
  await getModels().user.bulkCreate(userSeed);
  await getModels().product.bulkCreate(productSeed);

  console.log('Populate done!');
};

export default populate;
