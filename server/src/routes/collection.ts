import express from 'express';
import {
  addCollectionHandler,
  getCollectionTopics,
  getTopLargestCollectionsHandler,
} from '../controllers/collection';
import authProtect from '../middleware/authProtect';

const router = express.Router();

router.get('/largest', getTopLargestCollectionsHandler);

router.use(authProtect);

router.get('/topics', getCollectionTopics);
router.post('/', addCollectionHandler);

export default router;
