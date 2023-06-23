import express from 'express';
import {
  addCollectionHandler,
  getCollectionById,
  getCollectionTopics,
  getMyCollectionsHandlerHandler,
  getTopLargestCollectionsHandler,
  removeCollectionHandler,
  updateCollectionImageHandler,
} from '../controllers/collection';
import authProtect from '../middleware/authProtect';


const router = express.Router();

router.get('/largest', getTopLargestCollectionsHandler);

router.use(authProtect);

router.get('/topics', getCollectionTopics);
router.get('/my-collections',getMyCollectionsHandlerHandler);
router.post('/', addCollectionHandler);
router.put('/upload/:collectionId',updateCollectionImageHandler);
router.get('/:collectionId',getCollectionById);
router.delete('/:collectionId',removeCollectionHandler);

export default router;
