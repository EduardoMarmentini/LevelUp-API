import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    slug: string;
    description: string;
    price: number;
    active: boolean;
    tags: string[];
    photo: string;
    inStock: number;
}

const productSchema = new Schema<IProduct>({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  slug: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  active: { 
    type: Boolean, 
    default: false
  },
  tags: [{ 
    type: String, 
    trim: true
  }],
  photo: { 
    type: String, 
    required: true,
    trim: true
  },
  inStock : {
      type : Number,
      default : 1
  }
});

export const Product = model<IProduct>('Product', productSchema);