import express from 'express'
import authProtect from '../middleware/authProtect';
import { addCommentReactionHandler, unreactCommentReactionHandler } from '../controllers/commentReaction';

const router=express.Router();

router.use(authProtect);

router.post('/:commentId',addCommentReactionHandler);
router.delete('/:reactionId',unreactCommentReactionHandler);

export default router;