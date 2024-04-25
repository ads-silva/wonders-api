import Sequelize from 'sequelize';
import envConfig from '../config/envConfig.mjs';
import UserModel from './models/user.model.mjs';
import ProductModel from './models/product.model.mjs';
import appllyAssociations from './applyAssociations.mjs';
import ReservationOrderProductModel from './models/reservationOrderProduct.model.mjs';
import ReservationOrderModel from './models/reservationOrder.model.mjs';

const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = envConfig();

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialect: 'mariadb',
  logging: false,
});

const models = [UserModel, ProductModel, ReservationOrderModel, ReservationOrderProductModel];

// Define all models
for (const model of models) {
  model(sequelize);
}

// Define associations
appllyAssociations(sequelize);

export const startSequelizeConnection = async (forceSync = false) => {
  try {
    console.log('All models were synchronized successfully.');
    await sequelize.sync({ force: forceSync, alter: true });
    console.log(`Connecting to database..`);
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
};

export const getSequelize = () => sequelize;
export const getModels = () => sequelize.models;
