import { Router } from 'express';
import ProductController from '../controllers/product-controller';

const router = Router();

router.get('/', (req, res) => ProductController.getAllProducts(req, res));
router.post('/', (req, res) => ProductController.createProduct(req, res));


export default router;