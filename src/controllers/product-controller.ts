import { Request, Response } from 'express';
import Services from '../services/product-service';

class ProductController {

    public static async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await Services.findAll();
            if (!products) {
                res.status(404).json({ error: "Produtos não encontrados" });
                return;
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }

    public static async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const product = await Services.findById(id);
            if (!product) {
                res.status(404).json({ error: "Produto não encontrado" });
                return;
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }

    public static async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const productData = req.body;
            const newProduct = await Services.create(productData);

            res.status(201).json({message: "Produto criado com sucesso!", product: newProduct});

        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }

    public static async updateProduct(req: Request, res: Response): Promise<void> {
        try {

            const id = req.params.id;
            const productData = req.body;
            const updatedProduct = await Services.update(id, productData);

            if (!updatedProduct) {
                res.status(404).json({ error: "Produto não encontrado" });
                return;
            }

            res.status(200).json({message: "Produto atualizado com sucesso!"});

        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }

    public static async deleteProduct(req: Request, res: Response): Promise<void> {
        try {

            const id = req.params.id;
            const deleted = await Services.delete(id);

            if (!deleted) {
                res.status(404).json({ error: "Produto não encontrado" });
                return;
            }
            res.status(204).json({message: "Produto deletado com sucesso!"});

        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }
}

export default ProductController;