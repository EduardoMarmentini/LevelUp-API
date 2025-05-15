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

    async findById(id: string): Promise<IProduct | null> {
        try {
            const product = await Product.findById(id)
                .select('-__v') 
                .lean();
            if (!product) {
                throw new Error('Produto não encontrado');
            }   

            return product;
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            throw new Error('Falha ao buscar produto');
        }
    }

    async findByTitle(title: string): Promise<IProduct> {
        try {
            const product = await Product.findOne
                ({ title: { $regex: title, $options: 'i' } })
                .select('-__v')
                .lean();

            if (!product) {
                throw new Error('Produto não encontrado');
            }

            return product as IProduct;
            
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            throw new Error('Falha ao buscar produto');
        }
    }

    async findByTags(tags: string[]): Promise<IProduct[]> {
        try {
            const product =  await Product.find({ tags: { $in: tags } })
                .select('-__v')
                .lean();
            
            if (!product) {
                throw new Error('Produto não encontrado');
            }

            return product;

        } catch (error) {
            console.error('Erro ao buscar produtos por tags:', error);
            throw new Error('Falha ao buscar produtos por tags');
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

    async update(id: string, product: IProduct): Promise<IProduct | null> {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                product,
                { new: true, runValidators: true }
            )  
            .select('-__v')
            .lean();

            if (!updatedProduct) {
                throw new Error('Produto não encontrado');
            }

            return updatedProduct;
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw new Error('Falha ao atualizar produto');
        }
    }

    async delete(id: string): Promise<IProduct | null> {
        try {
            const deletedProduct = await Product.findByIdAndDelete(id)
                .select('-__v')
                .lean();

            if (!deletedProduct) {
                throw new Error('Produto não encontrado');
            }
            return deletedProduct;

        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            throw new Error('Falha ao deletar produto');
        }
    }

  }
  
  export default new ProductService();