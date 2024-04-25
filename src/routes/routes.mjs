import express from 'express';
import getAllProducts from '../controllers/productController.mjs';
import auth from '../controllers/authController.mjs';
import authMiddleware from '../middlewares/validationMiddleware.mjs';
import { createReservationOrder, getReservationOrders } from '../controllers/reservationController.mjs';

const authRoutes = () => {
  const router = express.Router();

  router.route('/auth').post(auth);
  router.route('/product').get(authMiddleware(['requester', 'manager']), getAllProducts);
  router.route('/reservation').post(authMiddleware(['requester']), createReservationOrder);
  router.route('/reservation').get(authMiddleware(['requester', 'manager']), getReservationOrders);

  router.route('/health-check').get((req, res) => {
    res.send({ status: 'ok' });
  });

  return router;
};

export default authRoutes();
