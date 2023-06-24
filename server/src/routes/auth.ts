import express from 'express'
import { generateRefreshToken,loginUser, logoutUser, registerUser, updateUserInfoHandler, uploadProfileImageHandler } from '../controllers/auth';
import authProtect from '../middleware/authProtect';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/refresh-token',generateRefreshToken);
router.get('/logout',authProtect,logoutUser);
  
router.use(authProtect);

router.put('/profile/update',updateUserInfoHandler);
router.put('/profile/upload',uploadProfileImageHandler);

export default router;

