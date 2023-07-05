import express from 'express';
import { changeUsersStatusHandler, editUserHandler, filterUsersHandler, getAllUsersHandler } from '../controllers/admin';
import authProtect from '../middleware/authProtect';
import adminProtect from '../middleware/adminProtect';


const router = express.Router();

router.use(authProtect);
router.use(adminProtect);

router.get('/users', getAllUsersHandler);
router.put('/filter-users', filterUsersHandler);
router.put('/change-status',changeUsersStatusHandler);
router.put('/edit-user/:userId',editUserHandler);

export default router;
