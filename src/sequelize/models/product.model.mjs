import { DataTypes } from 'sequelize';

const ProductModel = (sequelize) => {
  return sequelize.define('product', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    amount: {
      type: DataTypes.BIGINT,
      default: 0,
    },
  });
};

export default ProductModel;
