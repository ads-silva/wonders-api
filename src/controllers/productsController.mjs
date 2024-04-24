import findProducts from '../services/productsService.mjs';

const getAllProducts = async (req, res) => {
  const products = await findProducts();
  res.status(200).json({ products, size: products.length });
};

export default getAllProducts;
