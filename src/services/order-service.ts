import { Order, IOrder } from "../models/order-model";


// Exemplo básico de service
class OrderService {
    async findAll(): Promise<IOrder[]> {
        try {
            return await Order.find()
                .select('-__v')
                .lean();
        }
        catch (error) {
            console.error('Erro ao buscar pedidos:', error);
            throw new Error('Falha ao buscar pedidos');
        }
    }
}
  
export default new OrderService();