import { DataTypes } from 'sequelize';

const ReservationOrderProductModel = (sequelize) => {
  return sequelize.define('reservationOrderProduct', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    reservationOrderId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    productId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    amount: {
      type: DataTypes.BIGINT,
      default: 0,
    },
  });
};

export default ReservationOrderProductModel;
