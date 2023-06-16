import express from 'express'
import { generateRefreshToken, loginUser, registerUser } from '../controllers/auth';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/refresh-token',generateRefreshToken);

export default router;

