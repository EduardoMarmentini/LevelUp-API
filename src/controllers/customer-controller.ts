import { Request, Response } from 'express'
import { generateSalt, hashPassword } from '../utils/security-utils';
import Service from '../services/customer-service';
import { ValidationContract } from '../utils/validator-utils';

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
            const { password, email, name, ...rest } = req.body;

            // Chama classe de validação
            const contract = new ValidationContract();
            // Verifica se os campos obrigatórios estão preenchidos
            contract.isRequired(name, 'O nome é obrigatório');
            contract.isRequired(email, 'O email é obrigatório');
            contract.isRequired(password, 'A senha é obrigatória');
            // Verifica se os campos têm o tamanho mínimo
            contract.isEmail(email, 'O email não é válido');
            contract.hasMinLen(password, 6, 'A senha deve ter pelo menos 6 caracteres');

            if (!contract.isValid()) {
                res.status(400).json({ errors: contract.getErrors() });
                return;
            }

            const salt = generateSalt();
            const hashedPassword = hashPassword(password, salt);
            const newCustomer = await Service.create({
                ...rest,
                name,
                email,
                password: hashedPassword,
                salt: salt
            });

            res.status(201).json({message: 'Cliente criado com sucesso', customer: newCustomer});
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
        }
    }
}

export default new CustomerController();