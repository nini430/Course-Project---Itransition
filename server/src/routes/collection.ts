import express from 'express';
import {
  addCollectionHandler,
  getCollectionById,
  getCollectionExtendedHandler,
  getCollectionTopics,
  getMyCollectionsHandlerHandler,
  getTopLargestCollectionsHandler,
  removeCollectionHandler,
  updateCollectionHandler,
  updateCollectionImageHandler,
} from '../controllers/collection';
import authProtect from '../middleware/authProtect';
import ownerPermission from '../middleware/ownerPermission';


const router = express.Router();


router.get('/topics', getCollectionTopics);
router.get('/largest', getTopLargestCollectionsHandler);
router.get('/my-collections/:authorId',getMyCollectionsHandlerHandler);
router.get('/:collectionId',getCollectionById);

router.use(authProtect);

router.get('/extended/:collectionId',getCollectionExtendedHandler);
router.post('/', ownerPermission, addCollectionHandler);
router.put('/upload/:collectionId',updateCollectionImageHandler);
router.put('/:collectionId',ownerPermission,updateCollectionHandler);
router.delete('/:collectionId',removeCollectionHandler);

export default router;
