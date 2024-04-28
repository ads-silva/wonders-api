import express from 'express';
import getAllProducts from '../controllers/productController.mjs';
import { auth, loadMe } from '../controllers/authController.mjs';
import authMiddleware from '../middlewares/validationMiddleware.mjs';
import {
  createReservationOrder,
  getReservationOrders,
  getReservationOrder,
  acceptReservationOrder,
  rejectReservationOrder,
  deliverReservationOrder,
} from '../controllers/reservationController.mjs';

const authRoutes = () => {
  const router = express.Router();

  router.route('/auth').post(auth);
  router.route('/me').get(authMiddleware(['requester', 'manager']), loadMe);
  router.route('/product').get(authMiddleware(['requester', 'manager']), getAllProducts);
  router.route('/reservation').post(authMiddleware(['requester']), createReservationOrder);
  router.route('/reservation').get(authMiddleware(['requester', 'manager']), getReservationOrders);
  router.route('/reservation/:id').get(authMiddleware(['requester', 'manager']), getReservationOrder);
  router.route('/reservation/:id/accept').patch(authMiddleware(['manager']), acceptReservationOrder);
  router.route('/reservation/:id/reject').patch(authMiddleware(['manager']), rejectReservationOrder);
  router.route('/reservation/:id/deliver').patch(authMiddleware(['manager']), deliverReservationOrder);

  router.route('/health-check').get((req, res) => {
    res.send({ status: 'ok' });
  });

  return router;
};

export default authRoutes();
