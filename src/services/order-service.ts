import { Order, IOrder } from "../models/order-model";

class OrderService {

    async findAll(): Promise<IOrder[]> {
        try {
            const order = await Order.find()
                .select('-__v')
                .lean();
            
            if (!order) {   
                throw new Error('Pedidos não encontrados');
            }
            return order;
        }
        catch (error) {
            console.error('Erro ao buscar pedidos:', error);
            throw new Error('Falha ao buscar pedidos');
        }
    }

    async findById(id: string): Promise<IOrder | null> {
        try {
            const order = await Order.findById(id)
                .select('-__v')
                .lean();

            if (!order) {
                throw new Error('Pedido não encontrado');
            }

            return order;
        }
        catch (error) {
            console.error('Erro ao buscar pedido:', error);
            throw new Error('Falha ao buscar pedido');
        }

    }

    async findByUserId(userId: string): Promise<IOrder[]> {
        try {
            const orders = await Order.find({
                userId: userId
            })
                .select('-__v')
                .lean();
            if (!orders) {
                throw new Error('Pedidos não encontrados');
            }
            return orders;
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

    async updateStatus(id: string , codStatus : number): Promise<IOrder | null> {
        try {

            let status: string;
            
            switch (codStatus) {
            case 1:
                status = 'Pendente';
                break;
            case 2:
                status = 'Aprovado';
                break;
            case 3:
                status = 'Entregue';
                break;
            case 4:
                status = 'Cancelado';
                break;
            default:
                throw new Error('Status inválido');
            }

            const order = await Order.findByIdAndUpdate(
                id,
                { status: status },
                { new: true }
            )
            .select('-__v')
            .lean();

            if (!order) {
            throw new Error('Pedido não encontrado');
            }
            return order;
        }
        catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            throw new Error('Falha ao atualizar pedido');
        }
    }

}
  
export default new OrderService();