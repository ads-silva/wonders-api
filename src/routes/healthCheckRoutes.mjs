import express from 'express';
const healthCheckRoute = express.Router();

healthCheckRoute.route('/health-check').get((req, res) => {
  res.send({ status: 'ok' });
});

export default healthCheckRoute;
