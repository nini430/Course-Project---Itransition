import express from 'express'
import { getAllUsersHandler } from '../controllers/admin';

const router=express.Router();


router.get('/users',getAllUsersHandler);

export default router;