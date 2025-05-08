import IOrder from "../models/order-model";

// Exemplo básico de service
class OrderService {
    async findAll(): Promise<IOrder[]> {
        const orders: Array<IOrder> = [
            { 
                number: "ORD001", 
                customer: "John Doe", 
                createDate: new Date("2023-01-01"), 
                status: "created", 
                items: [
                    { quantity: 2, price: 1200, product: "Laptop" },
                    { quantity: 1, price: 800, product: "Smartphone" }
                ]
            },
            { 
                number: "ORD002", 
                customer: "Jane Smith", 
                createDate: new Date("2023-01-02"), 
                status: "done", 
                items: [
                    { quantity: 1, price: 150, product: "Headphones" },
                    { quantity: 1, price: 300, product: "Monitor" }
                ]
            },
            { 
                number: "ORD003", 
                customer: "Alice Johnson", 
                createDate: new Date("2023-01-03"), 
                status: "created", 
                items: [
                    { quantity: 1, price: 100, product: "Keyboard" },
                    { quantity: 2, price: 150, product: "Headphones" }
                ]
            },
            { 
                number: "ORD004", 
                customer: "Bob Brown", 
                createDate: new Date("2023-01-04"), 
                status: "done", 
                items: [
                    { quantity: 1, price: 1200, product: "Laptop" }
                ]
            },
            { 
                number: "ORD005", 
                customer: "Charlie Green", 
                createDate: new Date("2023-01-05"), 
                status: "created", 
                items: [
                    { quantity: 3, price: 300, product: "Monitor" },
                    { quantity: 1, price: 100, product: "Keyboard" }
                ]
            }
        ];
        return orders;
    }
  
}
  
export default new OrderService();