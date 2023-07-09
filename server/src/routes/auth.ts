import express from 'express'
import { forgotPasswordHandler, generateRefreshToken,getMyFollowsHandler,loginUser, logoutUser, registerUser, resetPasswordActionHandler, resetPasswordHandler, updateUserInfoHandler, uploadProfileImageHandler, verifyEmailActionHandler, verifyEmailHandler } from '../controllers/auth';
import authProtect from '../middleware/authProtect';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/refresh-token',generateRefreshToken);
router.put('/forgot-password',forgotPasswordHandler);
router.put('/reset-password/:userId',resetPasswordHandler);
router.put('/reset-password-action/:userId',resetPasswordActionHandler);
  
router.use(authProtect);

router.get('/logout',logoutUser);
router.get('/profile/follows',getMyFollowsHandler);
router.put('/profile/update',updateUserInfoHandler);
router.put('/profile/upload',uploadProfileImageHandler);
router.put('/verify-email/:userId',verifyEmailHandler);
router.put('/verify-email-action/:userId',verifyEmailActionHandler);

export default router;

