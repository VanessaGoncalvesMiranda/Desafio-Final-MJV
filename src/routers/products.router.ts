import { Request, Response, Router } from 'express';
import ProductsService from '../services/products.service';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';

const router = Router ();



router.get ('/', async (req: Request, res: Response) => {
    const products = await ProductsService.getAll();
    res.send(products);
});

router.get ('/:code', authorizationMiddleware, async (req: Request, res: Response) => {
    const product = await ProductsService.getByDocument(parseInt(req.params.code));
    if(!product) return  res.status(400).send({ message: "Produto não encontrado!" });
    res.status(200).send(product);
});

router.post ('/', authorizationMiddleware, async (req: Request, res: Response) => {
    if (req.body.quantity < 1){
        return res.status(400).send({message: 'Produto Indisponível'});
    }
    await ProductsService.create(req.body);
    res.status(201).send({message: 'Produto Criado com Sucesso!'});
});

router.post ('/authorization', async (req: Request, res: Response) => {
    try {
        const token = await ProductsService.authorization(req.body.code, req.body.password);
        res.status(200).send({ token });
    } catch (error: any) {
        res.status(401).send({ message: error.message });
    }
});

router.delete('/remove/:code', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await ProductsService.remove(parseInt(req.params.code));
        res.status(200).send({ message: "Produto excluído com sucesso!" });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

router.put('/:code', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await ProductsService.update(parseInt(req.params.code), req.body);
        res.status(200).send({ message: "Produto atualizado com sucesso!" });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }

});

export default router;