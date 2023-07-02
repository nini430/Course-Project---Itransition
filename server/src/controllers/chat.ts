import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import {
  createChat,
  findChat,
  findChatWithPeople,
  getChatMessages,
  getCurrentConversations,
  getMyFollows,
  sendMessage,
} from '../services/chat';
import { StatusCodes } from 'http-status-codes';

const getCurrentConversationsHandler = asyncHandler(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    const currentConversations = await getCurrentConversations(req.user.id);
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: currentConversations });
  }
);

const sendMessageHandler = asyncHandler(
  async (
    req: Request<
      { receiverId: string; chatId: string },
      {},
      { text: string }
    > & { user: any },
    res: Response,
    next: NextFunction
  ) => {
    const newMessage = await sendMessage(
      req.params.chatId,
      req.body.text,
      req.user.id,
      req.params.receiverId
    );

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: newMessage,
    });
  }
);

const getChatMessagesHandler = asyncHandler(
  async (
    req: Request<{memberOne:string,memberTwo:string}>,
    res: Response,
    next: NextFunction
  ) => {
    const {memberOne,memberTwo}=req.params;
    let currentChat;
    const {chat,userOne,userTwo}=await findChatWithPeople(memberOne,memberTwo);
    if(!chat) {
      currentChat=await createChat(memberOne,memberTwo);
    }else{
      currentChat=chat;
    }
    let messages:any;
    if (!chat) {
      messages = [];
    } else {
      messages = await getChatMessages(chat.id);
    }

    return res.status(StatusCodes.OK).json({ success: true, data: {messages, chat:{...currentChat,userTwo,userOne}} });
  }
);

const getMyFollowsHandler = asyncHandler(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    const follows = await getMyFollows(req.user.id);
    return res.status(StatusCodes.OK).json({ success: true, data: follows });
  }
);

export {
  getCurrentConversationsHandler,
  sendMessageHandler,
  getChatMessagesHandler,
  getMyFollowsHandler,
};
