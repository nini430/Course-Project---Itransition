import express from 'express'
import { getFullTextSearchHandler } from '../controllers/search';

const router=express.Router();


router.put('/',getFullTextSearchHandler);

export default router;