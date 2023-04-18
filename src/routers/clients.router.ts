import { Request, Response, Router } from 'express';
import ClientsService from '../services/clients.service';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';

const router = Router ();

router.get ('/', authorizationMiddleware, async (req: Request, res: Response) => {
    const clients = await ClientsService.getAll();
    res.send(clients);
});

router.get ('/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    const client = await ClientsService.getByDocument(req.params.document);
    if(!client) return  res.status(400).send({ message: 'Cliente não encontrado!' });
    res.status(200).send(client);
});

router.post ('/', authorizationMiddleware, async (req: Request, res: Response) => {
    if (req.body.age < 18) {
        return res.status(400).send({ message: 'Cliente não foi criado pois não tem a idade mínima (18 anos).' });
    }
    await ClientsService.create(req.body);
    res.status(201).send({ message: 'Cliente Criado com Sucesso!' });
});

router.post ('/authorization', async (req: Request, res: Response) => {
    try {
       const token = await ClientsService.authorization(req.body.document, req.body.password);
       res.status(200).send({ token });
    } catch(error: any) {
        res.status(401).send({ message: error.message });
    }
});

router.delete('/remove/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    try {
        await ClientsService.remove(req.params.document);
        res.status(200).send({ message: 'Cliente removido com sucesso!'})
    }catch(error: any) {
        res.status(400).send({ message: error.message });
    }
});

router.put('/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    try{
        await ClientsService.update(req.params.document, req.body);
        res.status(200).send({ message: "Cliente atualizado com sucesso!" });
    } catch(error: any) {
        res.status(400).send({ message: error.message});
    }
    
});

export default router;