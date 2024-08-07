import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

const router = Router();

// Mount routes with a global prefix
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;