import express from 'express';
import authProtect from '../middleware/authProtect';
import {
  getChatMessagesHandler,
  getCurrentConversationsHandler,
  getMyFollowsHandler,
  sendMessageHandler,
} from '../controllers/chat';

const router = express.Router();

router.use(authProtect);

router.get('/conversations', getCurrentConversationsHandler);
router.post('/add-message/:receiverId/:chatId', sendMessageHandler);
router.get('/messages/:memberOne/:memberTwo', getChatMessagesHandler);
router.get('/my-follows',getMyFollowsHandler);

export default router;
