const envConfig = () => {
  return {
    PORT: process.env.PORT ?? 3000,
    APP_URL: process.env.APP_URL ?? 'http://localhost:3000',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? 'example_key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '90d',
  };
};

export default envConfig;
