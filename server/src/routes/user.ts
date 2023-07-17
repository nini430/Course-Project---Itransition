import express from 'express';
import { getUserByIdHandler, toggleFollowUser } from '../controllers/user';
import authProtect from '../middleware/authProtect';

const router=express.Router();

router.get('/:userId',getUserByIdHandler);

router.use(authProtect);

router.put('/:followerId/:followedId',toggleFollowUser);

export default router;
