import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document
{
    number: string;
    customer?: string;
    createDate: Date;
    status: "created" | "done";
    items: Array<{
        quantity?: number;
        price: number;
        product?: string;
    }>;
}

const orderSchema = new Schema<IOrder>({
    number: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    customer: {
        type: String,
        required: false,
        trim: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["created", "done"],
        required: true
    },
    items: [{
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: String,
            required: false,
            trim: true
        }
    }]
});

export const Order = model<IOrder>("Order", orderSchema);