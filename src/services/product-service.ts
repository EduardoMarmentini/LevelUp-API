import IProduct from "../models/product-model";

// Exemplo básico de service
class ProductService {
    async findAll(): Promise<IProduct[]> {
        const products: Array<IProduct> = [
            { 
                id: 1, 
                title: "Laptop", 
                slug: "laptop", 
                description: "High-performance laptop", 
                price: 1200, 
                active: true, 
                tags: ["electronics", "computers"], 
                photo: "laptop.jpg", 
                inStock: 10
            },
            { 
                id: 2, 
                title: "Smartphone", 
                slug: "smartphone", 
                description: "Latest model smartphone", 
                price: 800, 
                active: true, 
                tags: ["electronics", "mobile"], 
                photo: "smartphone.jpg" ,
                inStock: 10
            },
            { 
                id: 3, 
                title: "Headphones", 
                slug: "headphones", 
                description: "Noise-cancelling headphones", 
                price: 150, 
                active: true, 
                tags: ["electronics", "audio"], 
                photo: "headphones.jpg",
                inStock: 10
            },
            { 
                id: 4, 
                title: "Monitor", 
                slug: "monitor", 
                description: "4K Ultra HD monitor", 
                price: 300, 
                active: true, 
                tags: ["electronics", "display"], 
                photo: "monitor.jpg" ,
                inStock: 10
            },
            { 
                id: 5, 
                title: "Keyboard", 
                slug: "keyboard", 
                description: "Mechanical keyboard", 
                price: 100, 
                active: true, 
                tags: ["electronics", "accessories"], 
                photo: "keyboard.jpg",
                inStock: 10
            },
        ];
        return products;
    }
  
  }
  
  export default new ProductService();