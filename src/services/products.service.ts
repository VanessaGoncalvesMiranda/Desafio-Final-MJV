import { IProduct } from '../models/product.model';
import ProductRepository from '../repositories/product.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class ProductsService {

    getAll() {
      return ProductRepository.getAll();
    }

    getByDocument(code: number) {
        return ProductRepository.getByDocument(code);
    }

    async create(product: IProduct) {
        if(product.password){
            product.password = await bcrypt.hash(product.password, 10);
        }
        return ProductRepository.create(product);
    }

    async authorization(code: number, password: string) {
        const product = await ProductRepository.getByDocument(code);

        if(!product) throw new Error('Produto não encontrado');

        const result = await bcrypt.compare(password, product.password);

        if(result) {
            return jwt.sign({ code: product.code, _id: product._id } , secretJWT, {
                expiresIn: '1h'
            });
        };

        throw new Error('Falha na autenticação!')
    }

    remove(code: number) {
      return ProductRepository.remove(code);
    }

    update(code: number, product: Partial<IProduct>) {
      return ProductRepository.update(code, product);
  }
}

export default new ProductsService();