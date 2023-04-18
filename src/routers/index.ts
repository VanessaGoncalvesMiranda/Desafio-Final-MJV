import { Router } from 'express';
import healthRouter from './health.router';
import productsRouter from './products.router';
import clientRouter from './clients.router';

const router = Router();

router.use('/health', healthRouter);
router.use('/products', productsRouter);
router.use('/clients', clientRouter);

export default router;