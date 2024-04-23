import app from './config/buildApp.mjs';
import envConfig from './config/envConfig.mjs';

const { PORT } = envConfig();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
