import express from 'express';
import { getUserByIdHandler, toggleFollowUser } from '../controllers/user';
import authProtect from '../middleware/authProtect';

const router=express.Router();

router.use(authProtect);

router.get('/:userId',getUserByIdHandler);
router.put('/:followerId/:followedId',toggleFollowUser);

export default router;
