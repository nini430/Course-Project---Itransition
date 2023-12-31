import express from 'express';

import authRouter from './auth';
import collectionRouter from './collection'
import itemRouter from './item'
import userRouter from './user'
import commentRouter from './comment';
import itemReactionRouter from './itemReaction'
import commentReactionRouter from './commentReaction'
import adminRouter from './admin';
import searchRouter from './search'

const router=express.Router();


router.use('/item',itemRouter);
router.use('/auth',authRouter);
router.use('/collection',collectionRouter);
router.use('/user',userRouter);
router.use('/comment',commentRouter);
router.use('/item-reaction',itemReactionRouter);
router.use('/comment-reaction',commentReactionRouter);
router.use('/admin',adminRouter);
router.use('/search',searchRouter);

export default router;