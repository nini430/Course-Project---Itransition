import express from 'express'
import passport from 'passport'

import { forgotPasswordHandler, generateRefreshToken,getMyFollowsHandler,getMyPassportUser,loginUser, logoutUser, passportSuccessRedirect, registerUser, resetPasswordActionHandler, resetPasswordHandler, updateUserInfoHandler, uploadProfileImageHandler, verifyEmailActionHandler, verifyEmailHandler } from '../controllers/auth';
import authProtect from '../middleware/authProtect';

const router=express.Router();


router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/google/callback',passport.authenticate('google'),passportSuccessRedirect);

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/refresh-token',generateRefreshToken);
router.put('/forgot-password',forgotPasswordHandler);
router.put('/reset-password/:userId',resetPasswordHandler);
router.put('/reset-password-action/:userId',resetPasswordActionHandler);
  
router.use(authProtect);

router.get('/logout',logoutUser);
router.get('/my-passport-user',getMyPassportUser);
router.get('/profile/follows',getMyFollowsHandler);
router.put('/profile/update',updateUserInfoHandler);
router.put('/profile/upload',uploadProfileImageHandler);
router.put('/verify-email/:userId',verifyEmailHandler);
router.put('/verify-email-action/:userId',verifyEmailActionHandler);

export default router;

