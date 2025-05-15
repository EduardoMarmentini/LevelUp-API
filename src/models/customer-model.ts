import { Schema, model, Document } from 'mongoose';

export interface ICustomer extends Document {
    name: string;
    email: string;
    password: string;
    salt: string;
    roles: string[];
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
  },
  salt: { 
    type: String, 
    required: true,
    select: false 
  },
  roles: { 
    type: [String], 
    default: ['user'] 
  }
});


customerSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.password;
    delete ret.salt;
    return ret;
  }
});

export const Customer = model<ICustomer>('Customer', customerSchema);