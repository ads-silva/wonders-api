const envConfig = () => {
  return {
    PORT: process.env.PORT ?? 3000,
    APP_URL: process.env.APP_URL ?? 'http://localhost:3000',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? 'example_key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '90d',
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  };
};

export default envConfig;
