import { Customer, ICustomer } from "../models/customer-model";
import { FilterQuery, QueryOptions } from 'mongoose';

class CustomerService {
    /**
     * Busca todos os clientes (sem senha)
     */
    async findAll(
        query: FilterQuery<ICustomer> = {},
        options: QueryOptions = {}
    ): Promise<Omit<ICustomer, 'password'>[]> {
        try {
            return await Customer.find(query, {}, options)
                .select('-password -__v')
                .lean();
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            throw new Error('Falha ao buscar clientes');
        }
    }

    /**
     * Busca cliente por ID (sem senha)
     */
    async findById(id: string): Promise<Omit<ICustomer, 'password'> | null> {
        try {
            return await Customer.findById(id)
                .select('-password -__v')
                .lean();
        } catch (error) {
            console.error('Erro ao buscar cliente por ID:', error);
            throw new Error('Falha ao buscar cliente');
        }
    }

    /**
     * Busca cliente por email (COM senha para autenticação)
     */
    async findByEmail(email: string): Promise<ICustomer | null> {
        try {
            return await Customer.findOne({ email })
                .select('+password')
                .lean();
        } catch (error) {
            console.error('Erro ao buscar cliente por email:', error);
            throw new Error('Falha ao buscar cliente');
        }
    }

    /**
     * Cria um novo cliente
     */
    async create(customerData: ICustomer): Promise<void> {
        try {
          await Customer.create(customerData);
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            throw new Error('Falha ao criar cliente');
        }
    }

    /**
     * Atualiza um cliente existente
     */
    async update(
        id: string,
        updateData: Partial<Omit<ICustomer, '_id'>>,
        options: QueryOptions = { new: true }
    ): Promise<Omit<ICustomer, 'password'> | null> {
        try {
            return await Customer.findByIdAndUpdate(id, updateData, options)
                .select('-password -__v')
                .lean();
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            throw new Error('Falha ao atualizar cliente');
        }
    }

    /**
     * Remove um cliente
     */
    async delete(id: string): Promise<boolean> {
        try {
            const result = await Customer.findByIdAndDelete(id);
            return !!result;
        } catch (error) {
            console.error('Erro ao remover cliente:', error);
            throw new Error('Falha ao remover cliente');
        }
    }
}

export default new CustomerService();