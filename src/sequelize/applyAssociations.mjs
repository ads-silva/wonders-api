const appllyAssociations = (sequelize) => {
  const { user, reservationOrder, product, reservationOrderProduct } = sequelize.models;

  // Define associations with User model
  reservationOrder.belongsTo(user, {
    as: 'requestUser',
    foreignKey: {
      allowNull: false,
    },
  });
  reservationOrder.belongsTo(user, { as: 'managerUser' });
  reservationOrder.belongsTo(user, {
    as: 'createdUser',
    foreignKey: {
      allowNull: false,
    },
  });
  reservationOrder.belongsTo(user, { as: 'updatedUser' });

  // Define many-to-many association between reservationOrder and product model with additional fields
  reservationOrder.belongsToMany(product, { through: reservationOrderProduct });
  product.belongsToMany(reservationOrder, { through: reservationOrderProduct });
};

export default appllyAssociations;
