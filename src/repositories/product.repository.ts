import { IProduct, Product } from '../models/product.model';

class ProductRepository {
    getAll() {
        return Product.find();
    }

    getByDocument(code: number) {
        return Product.findOne({ code: code});
    }

    create(product: IProduct) {
        return Product.create(product);
    }

    update(code: number, product: Partial<IProduct>) {
        return Product.updateOne({ code: code }, { $set: product });
    }

    remove(code: number) {
        return Product.deleteOne({ code: code });
    }
}

export default new ProductRepository();