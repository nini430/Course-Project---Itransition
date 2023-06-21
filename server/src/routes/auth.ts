import express from 'express'
import { generateRefreshToken, getUserInformationHandler, loginUser, logoutUser, registerUser, uploadProfileImageHandler } from '../controllers/auth';
import authProtect from '../middleware/authProtect';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/refresh-token',generateRefreshToken);
router.get('/logout',authProtect,logoutUser);

router.use(authProtect);

router.get('/me',getUserInformationHandler);
router.put('/profile/upload',uploadProfileImageHandler);

export default router;

