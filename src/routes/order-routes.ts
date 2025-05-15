import { Router } from 'express';
import OrderController from '../controllers/order-controller';

const router = Router();

router.get('/', (req, res) => OrderController.getAll(req, res));
router.get('/:id', (req, res) => OrderController.getById(req, res));
router.get('/customer/:id', (req, res) => OrderController.getByUserId(req, res));
router.post('/', (req, res) => OrderController.createOrder(req, res));
router.put('/:id', (req, res) => OrderController.updateStatusOrder(req, res));

export default router;