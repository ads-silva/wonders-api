import { getModels } from '../sequelize/index.mjs';

const findProducts = async () => {
  const products = await getModels().product.findAll();
  return products;
};

export default findProducts;
