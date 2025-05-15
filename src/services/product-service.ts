import { Product, IProduct} from "../models/product-model";
import { FilterQuery, QueryOptions } from 'mongoose';

class ProductService {
    async findAll(
        query: FilterQuery<IProduct> = {},
        options: QueryOptions = {}
    ): Promise<IProduct[]> {
        try {
            return await Product.find(query, {}, options)
            .select('-__v')
            .lean();
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw new Error('Falha ao buscar produtos');
        }
    }

    async create(product : IProduct): Promise<IProduct> {
        try {
            const newProduct = new Product(product);
            return await newProduct.save();
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw new Error('Falha ao criar produto');
        }
    }

  }
  
  export default new ProductService();