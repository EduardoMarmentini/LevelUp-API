import { Router } from 'express';
import CustomerController from '../controllers/customer-controller';

const router = Router();

router.get('/', (req, res) => CustomerController.getAllCustomers(req, res));
router.get('/:id', (req, res) => CustomerController.getCustomerById(req, res));
router.post('/', (req, res) => CustomerController.createCustomer(req, res));

export default router;