import express from 'express'
import authProtect from '../middleware/authProtect';
import { addReactionHandler, unreactItemHandler } from '../controllers/itemReaction';

const router=express.Router();

router.use(authProtect);



router.post('/:itemId',addReactionHandler);
router.delete('/:reactionId',unreactItemHandler);


export default router;