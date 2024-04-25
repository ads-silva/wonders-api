import { findProducts } from '../services/productService.mjs';

const getAllProducts = async (req, res) => {
  const products = await findProducts();
  res.status(200).json(products);
};

export default getAllProducts;
