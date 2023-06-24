import express from 'express';
import authProtect from '../middleware/authProtect';
import {
  addItemHandler,
  getItemByIdExtendedHandler,
  getLatestItemsHandler,
  getUniqueItemTagsHandler,
  initializeItemCreationHandler,
} from '../controllers/item';

const router = express.Router();

router.get('/latest', getLatestItemsHandler);
router.get('/single/:itemId',getItemByIdExtendedHandler);

router.use(authProtect);

router.get('/tags', getUniqueItemTagsHandler);
router.get('/:collectionId', initializeItemCreationHandler);
router.post('/:collectionId', addItemHandler);


export default router;
