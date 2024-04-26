import { DataTypes } from 'sequelize';
import generateRandomPIN from '../../tests/helpers/pinGenerator.mjs';

const ReservationOrderModel = (sequelize) => {
  return sequelize.define('reservationOrder', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pin: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: generateRandomPIN(),
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM(['pending', 'available', 'rejected', 'completed']),
      default: 'pending',
    },
    reason: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    managerComment: {
      allowNull: true,
      type: DataTypes.STRING,
      default: '',
    },
  });
};

export default ReservationOrderModel;
