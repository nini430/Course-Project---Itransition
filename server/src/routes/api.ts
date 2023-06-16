import express from 'express';

import authRouter from './auth';
import collectionRouter from './collection'

const router=express.Router();

router.use('/auth',authRouter);
router.use('/collection',collectionRouter);

export default router;