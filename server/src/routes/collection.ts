import express from 'express';
import {
  addCollectionHandler,
  getCollectionTopics,
  getMyCollectionsHandlerHandler,
  getTopLargestCollectionsHandler,
  removeCollectionHandler,
} from '../controllers/collection';
import authProtect from '../middleware/authProtect';

const router = express.Router();

router.get('/largest', getTopLargestCollectionsHandler);

router.use(authProtect);

router.get('/topics', getCollectionTopics);
router.get('/my-collections',getMyCollectionsHandlerHandler);
router.post('/', addCollectionHandler);
router.delete('/:collectionId',removeCollectionHandler);

export default router;
