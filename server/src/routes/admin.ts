import express from 'express';
import { filterUsersHandler, getAllUsersHandler } from '../controllers/admin';

const router = express.Router();

router.get('/users', getAllUsersHandler);
router.put('/filter-users', filterUsersHandler);

export default router;
