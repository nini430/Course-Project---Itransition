import express from 'express';
import authProtect from '../middleware/authProtect';
import { addItemHandler, getLatestItemsHandler, getUniqueItemTagsHandler, initializeItemCreationHandler } from '../controllers/item';


const router=express.Router();

router.use(authProtect);

router.get('/tags',getUniqueItemTagsHandler);
router.get('/latest',getLatestItemsHandler);
router.get('/:collectionId',initializeItemCreationHandler);
router.post('/:collectionId',addItemHandler);



export default router;