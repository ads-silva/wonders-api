import { DataTypes } from 'sequelize';

const ReservationOrderProductModel = (sequelize) => {
  return sequelize.define('reservationOrderProduct', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      default: 0,
    },
  });
};

export default ReservationOrderProductModel;
