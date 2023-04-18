import ClientRepository from '../repositories/client.repository';
import { IClient } from '../models/client.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class ClientsService {

    getAll() {
        return ClientRepository.getAll();
    }

    getByDocument(document: string) {
        return ClientRepository.getByDocument(document);
    }

    async create(client: IClient) {
        if(client.password) {
            client.password = await bcrypt.hash(client.password, 10);
        }
        return ClientRepository.create(client);
    }

    async authorization(document: string, password: string) {
        const client = await ClientRepository.getByDocument(document);

        if(!client) throw new Error('Cliente não encontrado!')

        const result = await bcrypt.compare(password, client.password);

        if(result) {
            return jwt.sign({ document: client.document, _id: client._id }, secretJWT, {
                expiresIn: '1h'
            });    
        };

        throw new Error('Falha na autenticação!')

    }

    remove(document: string) {
        return ClientRepository.remove(document);
    }

    update(document: string, client: Partial<IClient>){
        return ClientRepository.update(document, client);
    }   
}

export default new ClientsService();