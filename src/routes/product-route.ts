import { Router } from 'express';
import ProductController from '../controllers/product-controller';

const router = Router();

router.get('/', (req, res) => ProductController.getAllProducts(req, res));
router.get('find/:id', (req, res) => ProductController.getProductById(req, res));
router.get('/title/:title', (req, res) => ProductController.getProductByTitle(req, res));
router.get('/tags', (req, res) => ProductController.getProductByTags(req, res));
router.post('/', (req, res) => ProductController.createProduct(req, res));
router.put('/:id', (req, res) => ProductController.updateProduct(req, res));
router.delete('/:id', (req, res) => ProductController.deleteProduct(req, res));

export default router;