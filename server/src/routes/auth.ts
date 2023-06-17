import express from 'express'
import { generateRefreshToken, loginUser, logoutUser, registerUser } from '../controllers/auth';
import authProtect from '../middleware/authProtect';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/refresh-token',generateRefreshToken);
router.get('/logout',authProtect,logoutUser);

export default router;

