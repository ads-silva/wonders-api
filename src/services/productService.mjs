import { getModels } from '../sequelize/index.mjs';

export const findProducts = async () => {
  const products = await getModels().product.findAll();
  return products;
};

export const findProductByIds = async (id) => {
  const product = await getModels().product.findByPk(id);
  return product;
};
