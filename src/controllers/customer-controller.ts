import { Request, Response } from 'express'
import Service from '../services/customer-service';

class CustomerController {
    async getAllCustomers(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10, ...filters } = req.query;

            const customers = await Service.findAll(filters, {
                skip: (Number(page) - 1) * Number(limit),
                limit: Number(limit)
            });
            if (!customers) {
                res.status(404).json({ error: 'Clientes não encontrados' });
                return;
            }
            
            res.json(customers);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido' });
            }
        }
    }

    async getCustomerById(req: Request, res: Response) {
        try {
            const customer = await Service.findById(req.params.id);
            customer
                ? res.json(customer)
                : res.status(404).json({ error: 'Cliente não encontrado' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro desconhecido' });
            }
        }
    }

    async createCustomer(req: Request, res: Response) {
        try {
            const newCustomer = await Service.create(req.body);
            res.status(201).json(newCustomer);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Erro desconhecido' });
            }
        }
    }
}

export default new CustomerController();
