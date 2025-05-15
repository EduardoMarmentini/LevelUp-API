import { Request, Response } from 'express';
import OrderService from '../services/order-service';

class OrderController {

    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const orders = await OrderService.findAll();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }

    public static async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const order = await OrderService.findById(id);

            if (!order) {
                res.status(404).json({ error: "Pedido não encontrado" });
                return;
            }

            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }

    public static async getByUserId(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const orders = await OrderService.findByUserId(userId);

            if (!orders) {
                res.status(404).json({ error: "Pedidos não encontrados para este cliente" });
                return;
            }

            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }

    public static async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const newOrder = await OrderService.create(req.body);
            res.status(201).json({message: "Pedido criado com sucesso!", newOrder : newOrder});
        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }

    public static async updateStatusOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedOrder = await OrderService.updateStatus(id, req.body);

            if (!updatedOrder) {
                res.status(404).json({ error: "Pedido não encontrado" });
                return;
            }

            res.status(200).json({message: "Status do pedido atualizado com sucesso!"});

        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }

}

export default OrderController;