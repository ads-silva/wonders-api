import app from './config/buildApp.mjs';
import envConfig from './config/envConfig.mjs';
import { startDatabaseConnection } from './sequelize/index.mjs';

const { PORT } = envConfig();

const init = async () => {
  await startDatabaseConnection();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

init();
