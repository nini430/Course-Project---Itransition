import express from 'express';
import { getUserByIdHandler } from '../controllers/user';
import authProtect from '../middleware/authProtect';

const router=express.Router();

router.use(authProtect);

router.get('/:userId',getUserByIdHandler);

export default router;
