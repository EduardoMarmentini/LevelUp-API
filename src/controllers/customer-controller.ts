import { Request, Response } from 'express';
import  Services  from '../services/customer-service';

class CustomerController {
    public static async get(req: Request, res: Response): Promise<void> {
        try {
            const customers = await Services.findAll();

            if (!customers) {
                res.status(404).json({ error: "Clientes não encontrados" });
                return;
            }

            res.status(200).json(customers);;

        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }

    public static async post(req: Request, res: Response): Promise<void> {
        try {
            res.status(201).json({ message: "Cliente criado" });
        } catch (error) {
            res.status(500).json({ error: "Erro interno" });
        }
    }
}

export default CustomerController;