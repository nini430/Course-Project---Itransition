import express from 'express';
import { changeUsersRoleHandler, changeUsersStatusHandler, editUserHandler, filterUsersHandler, getAllUsersHandler, sortUsersHandler } from '../controllers/admin';
import authProtect from '../middleware/authProtect';
import adminProtect from '../middleware/adminProtect';
import { registerUser } from '../controllers/auth';


const router = express.Router();

router.use(authProtect);
router.use(adminProtect);

router.get('/users', getAllUsersHandler);
router.put('/filter-users', filterUsersHandler);
router.put('/sort-users',sortUsersHandler);
router.put('/change-status',changeUsersStatusHandler);
router.put('/change-role',changeUsersRoleHandler);
router.post('/add-user',registerUser);
router.put('/edit-user/:userId',editUserHandler);

export default router;
