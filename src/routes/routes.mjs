import express from 'express';
import getAllProducts from '../controllers/productsController.mjs';
import auth from '../controllers/authController.mjs';
import authMiddleware from '../middlewares/validationMiddleware.mjs';

const authRoutes = () => {
  const router = express.Router();

  router.route('/auth').post(auth);
  router.route('/product').get(authMiddleware(['requester', 'manager']), getAllProducts);

  router.route('/health-check').get((req, res) => {
    res.send({ status: 'ok' });
  });

  return router;
};

export default authRoutes();
