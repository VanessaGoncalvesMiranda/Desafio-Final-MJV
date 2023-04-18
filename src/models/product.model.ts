
import { Schema } from 'mongoose';
import mongoose from 'mongoose';

export interface IProduct {
    password: string;
    code: number;
    product: string;
    description: string;
    fragrance: string;
    volume: string;
    price: number;
    img: string;
    quantity: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export const productSchema = new Schema<IProduct>({
    password: {
        type: String
    },
    code: {
        type: Number
    },
    product: {
        type: String
    },
    description: {
        type: String
    },
    fragrance: {
        type: String
    },
    volume: {
        type: String
    },
    price: {
        type: Number
    },
    img: {
        type: String
    },
    quantity: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

});

export const Product = mongoose.model<IProduct>('Product', productSchema);