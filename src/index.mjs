import app from './config/buildApp.mjs';
import envConfig from './config/envConfig.mjs';
import { startSequelizeConnection } from './sequelize/index.mjs';

const { PORT } = envConfig();

const init = async () => {
  await startSequelizeConnection();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

init();
