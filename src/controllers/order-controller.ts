import { Request, Response } from 'express';
import  Services  from '../services/product-service';

class OrderController {
    public static async get(req: Request, res: Response): Promise<void> {
        try {
            const orders = await Services.findAll();

            if (!orders) {
                res.status(404).json({ error: "Pedidos não encontrados" });
                return;
            }

            res.status(200).json(orders);;

        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }
}

export default OrderController;