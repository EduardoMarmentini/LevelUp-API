import { Router } from 'express';
import CustomerController from '../controllers/customer-controller';

const router = Router();

router.get('/', (req, res) => CustomerController.get(req, res));
router.post('/', (req, res) => CustomerController.post(req, res));

export default router;