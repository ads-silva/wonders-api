import { findProducts, findProductsIncludeReserved } from '../services/productService.mjs';

const getAllProducts = async (req, res) => {
  if (req.user.role === 'manager') {
    const products = await findProductsIncludeReserved();
    res.status(200).json(products);
    return;
  }
  const products = await findProducts();
  res.status(200).json(products);
};

export default getAllProducts;
