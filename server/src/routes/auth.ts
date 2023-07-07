import express from 'express'
import { forgotPasswordHandler, generateRefreshToken,getMyFollowsHandler,loginUser, logoutUser, registerUser, updateUserInfoHandler, uploadProfileImageHandler } from '../controllers/auth';
import authProtect from '../middleware/authProtect';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/refresh-token',generateRefreshToken);
router.put('/forgot-password',forgotPasswordHandler);
  
router.use(authProtect);

router.get('/logout',logoutUser);
router.get('/profile/follows',getMyFollowsHandler);
router.put('/profile/update',updateUserInfoHandler);
router.put('/profile/upload',uploadProfileImageHandler);


export default router;

