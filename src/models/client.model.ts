import { Schema } from 'mongoose';
import mongoose from 'mongoose';

export interface IClient {
    name: string;
    email: string;
    document: string;
    password: string;
    phone: string;
    age: number;
    createdAt: string | Date;
    updatedAt: string | Date;
    //ou phone: string | undefined;//
}

export const clientSchema = new Schema<IClient>({
    name: {
        type: String
    },
    email: {
        type: String
    },
    document: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    phone: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }

});

export const Client = mongoose.model<IClient>('Client', clientSchema);