import { getModels } from '../../sequelize/index.mjs';
import { userSeed } from '../../sequelize/seeds.mjs';

const populate = async () => {
  console.log('Start populate...');
  await getModels().user.bulkCreate(userSeed);

  console.log('Populate done!');
};

export default populate;
