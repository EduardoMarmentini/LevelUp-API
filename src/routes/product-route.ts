import { Router } from 'express';
import ProductController from '../controllers/product-controller';

const router = Router();

router.get('/', (req, res) => ProductController.get(req, res));

export default router;