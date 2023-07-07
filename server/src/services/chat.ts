import { simpleUser } from '../utils/commonQueryObjs';
import client from '../utils/prismaClient';
import { findUserByIdWithoutPass } from './auth';

const getCurrentConversations = async (userId: string) => {
  const conversations = await client.chat.findMany({
    where: { OR: [{ memberOneId: userId }, { memberTwoId: userId }] },
  });
  const conversationWithUsers = await Promise.all(
    conversations.map(async (conversation) => {
      const userOne = await findUserByIdWithoutPass(conversation.memberOneId);
      const userTwo = await findUserByIdWithoutPass(conversation.memberTwoId);
      return { ...conversation, userOne, userTwo };
    })
  );
  return conversationWithUsers;
};

const findChatWithPeople = async (memberOne: string, memberTwo: string) => {
  const chat = await client.chat.findFirst({
    where: {
      OR: [
        { AND: [{ memberOneId: memberOne, memberTwoId: memberTwo }] },
        { AND: [{ memberOneId: memberTwo, memberTwoId: memberOne }] },
      ],
    },
  });
  const userOne = await findUserByIdWithoutPass(memberOne);
  const userTwo = await findUserByIdWithoutPass(memberTwo);
  return { chat, userOne, userTwo };
};

const createChat = async (memberOne: string, memberTwo: string) => {
  const chat = await client.chat.create({
    data: { memberOneId: memberOne, memberTwoId: memberTwo },
  });
  return chat;
};

const sendMessage = async (
  chatId: string,
  message: string,
  senderId: string,
  receiverId: string
) => {
  const newMessage = await client.message.create({
    data: { text: message, chatId, senderId, receiverId },
    include: {
      sender: {
        select: simpleUser,
      },
      receiver:{
        select:simpleUser
      }
    },
  });
  return newMessage;
};

const findChat = async (memberOne: string, memberTwo: string) => {
  const chat = await client.chat.findFirst({
    where: {
      OR: [
        { AND: [{ memberOneId: memberOne, memberTwoId: memberTwo }] },
        { AND: [{ memberOneId: memberTwo, memberTwoId: memberOne }] },
      ],
    },
  });
  return chat;
};

const getChatMessages = async (chatId: string) => {
  const messages = await client.message.findMany({
    where: { chatId },
    orderBy: { createdAt: 'asc' },
    include: {
      sender: {
        select: {
          firstName: true,
          lastName: true,
          id: true,
          profileImage: true,
        },
      },
      receiver: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          id: true,
        },
      },
    },
  });
  return messages;
};

const getMyFollows = async (userId: string) => {
  const followers = await client.follow.findMany({
    where: { followerId: userId },
    include: {
      follower: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          id: true,
        },
      },
    },
  });
  return followers;
};

const getChatUsersByIds=async(userIds:string[])=>{
  const users=await client.user.findMany({
    where:{
      id:{in:userIds}
    }
  })
  return users;
}
export {
  getCurrentConversations,
  createChat,
  sendMessage,
  findChat,
  getChatMessages,
  getMyFollows,
  findChatWithPeople,
  getChatUsersByIds
};
