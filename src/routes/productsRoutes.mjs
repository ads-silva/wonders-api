import express from 'express';
import getAllProducts from '../controllers/productsController.mjs';

const productRouters = () => {
  const router = express.Router();

  router.route('/product').get(getAllProducts);

  return router;
};

export default productRouters();
