import express from 'express';
import authProtect from '../middleware/authProtect';
import {
  addItemHandler,
  getLatestItemsHandler,
  getUniqueItemTagsHandler,
  initializeItemCreationHandler,
} from '../controllers/item';
import { getItemByIdExtended } from '../services/item';

const router = express.Router();

router.get('/latest', getLatestItemsHandler);

router.use(authProtect);

router.get('/tags', getUniqueItemTagsHandler);
router.get('/single/:itemId',getItemByIdExtended);
router.get('/:collectionId', initializeItemCreationHandler);
router.post('/:collectionId', addItemHandler);


export default router;
