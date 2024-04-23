import express from 'express';
import helmet from 'helmet';
import healthCheckRoute from '../routes/healthCheckRoutes.mjs';
import authRoutes from '../routes/authRoutes.mjs';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(healthCheckRoute);

export default app;
