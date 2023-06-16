import express from 'express'
import { getCollectionTopics } from '../controllers/collection';
import authProtect from '../middleware/authProtect';

const router=express.Router();

router.use(authProtect);

router.get('/topics',getCollectionTopics);

export default router;

