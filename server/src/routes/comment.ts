import express from 'express';
import authProtect from '../middleware/authProtect';
import { addCommentHandler } from '../controllers/comment';

const router = express.Router();

router.use(authProtect);

router.post('/:itemId',addCommentHandler);

export default router;
