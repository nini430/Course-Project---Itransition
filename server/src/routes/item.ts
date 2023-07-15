import express from 'express';
import authProtect from '../middleware/authProtect';
import {
  addItemHandler,
  editItemHandler,
  filterItemHandler,
  getItemByIdExtendedHandler,
  getLatestItemsHandler,
  getMyItemsHandler,
  getUniqueItemTagsHandler,
  initializeItemCreationHandler,
  removeItemHandler,
  removeItemsHandler,
  sortItemHandler,
} from '../controllers/item';

const router = express.Router();


router.get('/my-items/:collectionId',getMyItemsHandler);
router.get('/latest', getLatestItemsHandler);
router.get('/single/:itemId',getItemByIdExtendedHandler);
router.put('/filter/:collectionId',filterItemHandler);
router.put('/sort/:collectionId',sortItemHandler);


router.use(authProtect);

router.put('/remove-items',removeItemsHandler);
router.get('/tags', getUniqueItemTagsHandler);
router.get('/:collectionId', initializeItemCreationHandler);
router.post('/:collectionId', addItemHandler);
router.put('/:itemId',editItemHandler);
router.delete('/:itemId',removeItemHandler);


export default router;
