import { startDatabaseConnection, getSequelize, getModels } from './index.mjs';

const populate = async () => {
  await startDatabaseConnection();

  console.log('Will rewrite the mariadb example database, adding some dummy data.');

  await getSequelize().sync({ force: true });

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

populate();
