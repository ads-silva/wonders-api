import { getSequelize, getModels } from '../sequelize/index.mjs';

// Use the function to create ReservationOrder with associated ReservationOrderProducts
export const create = async (payload, userId) => {
  let transaction;
  try {
    // Start a transaction
    transaction = await getSequelize().transaction();

    // First find all requaested products from database
    const productIds = payload.products.flatMap((item) => item.productId);
    const dataBaseProducts = await getModels().product.findAll(
      { where: { id: productIds }, attributes: ['id', 'amount'] },
      { transaction },
    );

    // Check if there is balance enough for this operation
    const overBalance = payload.products.some((requaestedProduct) => {
      return dataBaseProducts.some((dataBaseProduct) => {
        return requaestedProduct.productId === dataBaseProduct.id && requaestedProduct.amount > dataBaseProduct.amount;
      });
    });

    if (overBalance) {
      throw new Error('no balance');
    }

    // Create the ReservationOrder
    const reservationOrder = await getModels().reservationOrder.create(
      {
        status: 'pending',
        reason: payload.reason,
        requestUserId: userId,
        createdUserId: userId,
      },
      { transaction },
    );

    // Add the products to this reservation
    const productCreatePromises = payload.products.map(async (product) => {
      await getModels().reservationOrderProduct.create(
        {
          reservationOrderId: reservationOrder.id,
          productId: product.productId,
          amount: product.amount,
        },
        { transaction },
      );
    });

    // Wait for all products to be created
    await Promise.all(productCreatePromises);

    // Update product balances
    const productConsumeBalancePromises = payload.products.map(async (product) => {
      await getModels().product.increment(
        { amount: -product.amount },
        { where: { id: product.productId }, transaction },
      );
    });

    // Wait for all products to be created
    await Promise.all(productConsumeBalancePromises);

    // Commit the transaction
    await transaction.commit();

    return reservationOrder;
  } catch (error) {
    // Rollback the transaction if there's an error
    if (transaction) await transaction.rollback();
    throw error;
  }
};

export const findAll = async () => {
  const reservationOrders = await getModels().reservationOrder.findAll();
  return reservationOrders;
};

export const findByPk = async (id, expands = false) => {
  const reservationOrder = await getModels().reservationOrder.findOne({
    where: { id },
    ...(expands && {
      include: [
        {
          model: getModels().product,
          as: 'products',
          attributes: ['id', 'name', 'description'],
          through: {
            as: 'reservation',
            attributes: ['amount', 'createdAt', 'updatedAt'],
          },
        },
      ],
    }),
  });

  return reservationOrder;
};

export const accept = async (id, reservationOrder) => {
  // Upadate status
  reservationOrder.status = 'available';
  await getModels().reservationOrder.update(
    {
      status: 'available',
    },
    { where: { id } },
  );

  return reservationOrder;
};

export const reject = async (id, reservationOrder) => {
  let transaction;
  try {
    // Start a transaction
    transaction = await getSequelize().transaction();

    // Mapp products
    const productsMapped = reservationOrder.products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      amount: product.reservation.amount,
    }));

    // Return the products amount to origin
    const productConsumeBalancePromises = productsMapped.map(async (product) => {
      await getModels().product.increment({ amount: +product.amount }, { where: { id: product.id }, transaction });
    });

    // Wait for all products updates
    await Promise.all(productConsumeBalancePromises);

    // Update reservation status
    await getModels().reservationOrder.update({ status: 'rejected' }, { where: { id } });
    reservationOrder.status = 'rejected';

    // Commit the transaction
    await transaction.commit();

    return reservationOrder;
  } catch (error) {
    // Rollback the transaction if there's an error
    if (transaction) await transaction.rollback();
    throw error;
  }
};

export const deliver = async (id, reservationOrder) => {
  // Upadate status
  reservationOrder.status = 'completed';
  await getModels().reservationOrder.update(
    {
      status: 'completed',
    },
    { where: { id } },
  );

  return reservationOrder;
};
