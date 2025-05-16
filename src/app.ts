import express, { Application, Request, Response } from 'express';
import customerRoutes from './routes/customer-route';
import productRoutes from './routes/product-route';
import orderRoutes from './routes/order-routes';
import { API_PREFIX } from './config';

import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get(`${API_PREFIX}/`, (req: Request, res: Response) => {
  res.send('LevelUp API - Hello World!');
});

app.use(`${API_PREFIX}/customer`, customerRoutes);
app.use(`${API_PREFIX}/product`, productRoutes);
app.use(`${API_PREFIX}/order`, orderRoutes);

export default app;