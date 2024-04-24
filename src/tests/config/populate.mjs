import { getModels, getSequelize } from '../../sequelize/index.mjs';

const populate = async () => {
  await getModels().user.bulkCreate([
    {
      email: 'requester@mail.com',
      password: 'fed42fb0fabde4000af60bf1f63037905176d6db1df5c2ee6214ee83565de36b',
      role: 'requester',
    },
    {
      email: 'manager@mail.com',
      password: 'fed42fb0fabde4000af60bf1f63037905176d6db1df5c2ee6214ee83565de36b',
      role: 'manager',
    },
  ]);

  console.log('Done!');
};

export default populate;
