import express, { Application, Request, Response } from 'express';
import customerRoutes from './routes/customer-route';
import productRoutes from './routes/product-route';
import orderRoutes from './routes/order-routes';

import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
  res.send('LevelUp API - Hello World!');
});
app.use('/customers', customerRoutes);
app.use('/product', productRoutes);
app.use('/orders', orderRoutes);

export default app;