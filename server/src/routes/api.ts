import express from 'express';

import authRouter from './auth';
import collectionRouter from './collection'
import itemRouter from './item'
import userRouter from './user'

const router=express.Router();

router.use('/auth',authRouter);
router.use('/collection',collectionRouter);
router.use('/item',itemRouter);
router.use('/user',userRouter);

export default router;