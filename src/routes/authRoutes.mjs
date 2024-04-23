import express from 'express';
import auth from '../controllers/authController.mjs';

const authRoutes = () => {
  const router = express.Router();

  router.route('/auth').post(auth);

  return router;
};

export default authRoutes();
