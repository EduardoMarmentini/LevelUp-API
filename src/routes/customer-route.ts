import { Router } from 'express';
import CustomerController from '../controllers/customer-controller';

const router = Router();

router.get('/', (req, res) => CustomerController.getAllCustomers(req, res));
router.get('/:id', (req, res) => CustomerController.getCustomerById(req, res));
router.post('/', (req, res) => CustomerController.createCustomer(req, res));
router.put('/:id', (req, res) => CustomerController.updateCustomer(req, res));
router.delete('/:id', (req, res) => CustomerController.deleteCustomer(req, res));

export default router;