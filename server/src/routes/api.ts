import express from 'express';

import authRouter from './auth';
import collectionRouter from './collection'
import itemRouter from './item'
import userRouter from './user'
import commentRouter from './comment';
import itemReactionRouter from './itemReaction'
import commentReactionRouter from './commentReaction'
import chatRouter from './chat';
import adminRouter from './admin';

const router=express.Router();


router.use('/item',itemRouter);
router.use('/auth',authRouter);
router.use('/collection',collectionRouter);
router.use('/user',userRouter);
router.use('/comment',commentRouter);
router.use('/item-reaction',itemReactionRouter);
router.use('/comment-reaction',commentReactionRouter);
router.use('/chat',chatRouter);
router.use('/admin',adminRouter);

export default router;