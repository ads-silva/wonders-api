import { Op } from 'sequelize';
import { getModels, getSequelize } from '../sequelize/index.mjs';

export const findProducts = async () => {
  const products = await getModels().product.findAll();
  return products;
};

export const findProductsIncludeReserved = async () => {
  const products = await getModels().product.findAll({
    attributes: [
      'id',
      'name',
      'description',
      'price',
      'amount',
      'createdAt',
      'updatedAt',
      [getSequelize().fn('COUNT', getSequelize().col('reservations.products.amount')), 'amountReserved'],
    ],
    include: [
      {
        model: getModels().reservationOrder,
        as: 'reservations',
        attributes: [],
        required: false,
        where: {
          [Op.or]: [{ status: 'pending' }, { status: 'available' }],
        },
        through: {
          as: 'products',
          attributes: ['amount'],
        },
      },
    ],
    group: ['id'],
  });
  return products;
};

export const findProductByIds = async (id) => {
  const product = await getModels().product.findByPk(id);
  return product;
};
