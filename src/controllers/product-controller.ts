import { Request, Response } from 'express';
import  Services  from '../services/product-service';

class ProductController {

    public static async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await Services.findAll();

            if (!products) {
                res.status(404).json({ error: "Produtos não encontrados" });
                return;
            }

            res.status(200).json(products);;

        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }

    public static async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await Services.create(req.body);

            if (!product) {
                res.status(400).json({ error: "Produto não criado" });
                return;
            }

            res.status(201).json({message: "Produto criado com sucesso", product});

        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }
}

export default ProductController;