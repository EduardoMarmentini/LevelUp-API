import { Schema, model, Document } from 'mongoose';

export interface ICustomer extends Document {
    name: string;
    email: string;
    password: string;
}

const customerSchema = new Schema<ICustomer>({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    select: false 
  }
});

// Remove o _id do retorno se desejar
customerSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.password;
    return ret;
  }
});

export const Customer = model<ICustomer>('Customer', customerSchema);