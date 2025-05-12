import { Product, IProduct} from "../models/product-model";
import { FilterQuery, QueryOptions } from 'mongoose';

// Exemplo básico de service
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
  
  }
  
  export default new ProductService();