import { Order, IOrder } from "../models/order-model";

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

    async create(order: IOrder): Promise<IOrder> {
        try {
            const newOrder = new Order(order);
            return await newOrder.save();
        }
        catch (error) {
            console.error('Erro ao criar pedido:', error);
            throw new Error('Falha ao criar pedido');
        }
    }
}
  
export default new OrderService();