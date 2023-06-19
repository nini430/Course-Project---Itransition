import express from 'express';

import authRouter from './auth';
import collectionRouter from './collection'
import itemRouter from './item'

const router=express.Router();

router.use('/auth',authRouter);
router.use('/collection',collectionRouter);
router.use('/item',itemRouter);

export default router;