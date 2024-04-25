import { DataTypes } from 'sequelize';

const ReservationOrderProductModel = (sequelize) => {
  return sequelize.define('reservationOrderProduct', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    reservationOrderId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    productId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    amount: {
      type: DataTypes.BIGINT,
      default: 0,
    },
  });
};

export default ReservationOrderProductModel;
