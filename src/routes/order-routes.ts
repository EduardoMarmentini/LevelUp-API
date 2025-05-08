import { Router } from 'express';
import OrderController from '../controllers/order-controller';

const router = Router();

router.get('/', (req, res) => OrderController.get(req, res));

export default router;