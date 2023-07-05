import express from 'express';
import { editUserHandler, filterUsersHandler, getAllUsersHandler } from '../controllers/admin';
import authProtect from '../middleware/authProtect';
import adminProtect from '../middleware/adminProtect';


const router = express.Router();

router.use(authProtect);
router.use(adminProtect);

router.get('/users', getAllUsersHandler);
router.put('/filter-users', filterUsersHandler);
router.put('/edit-user/:userId',editUserHandler);

export default router;
