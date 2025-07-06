import { Router } from 'express';
import contactRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();
router.use(contactRouter);
router.use(authRouter);
export default router;
