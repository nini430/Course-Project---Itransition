import express from 'express';
import authProtect from '../middleware/authProtect';
import { addCommentHandler, removeCommentHandler, editCommentHandler } from '../controllers/comment';


const router = express.Router();

router.use(authProtect);

router.post('/:itemId',addCommentHandler);
router.put('/:commentId',editCommentHandler);
router.delete('/:commentId',removeCommentHandler);

export default router;
