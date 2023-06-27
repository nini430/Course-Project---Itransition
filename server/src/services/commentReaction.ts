import client from '../utils/prismaClient';
import { Emojis } from '@prisma/client';

const getReactionById = async (reactionId: string) => {
  const reaction = await client.commentReaction.findUnique({
    where: { id: reactionId },
  });
  return reaction;
};

const reactComment = async (
  commentId: string,
  emoji: Emojis,
  userId: string
) => {
  const reaction = await client.commentReaction.create({
    data: { name: emoji, commentId, userId },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          id: true,
        },
      },
    },
  });
  return reaction;
};

const updateReactComment = async (reactionId: string, emoji: Emojis) => {
  const updatedReaction=await client.commentReaction.update({
    data: { name: emoji },
    where: { id: reactionId },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          id: true,
          profileImage: true,
        },
      },
    },
  });
  return updatedReaction;
};

const unreactComment=async(reactionId:string)=>{
  await client.commentReaction.delete({where:{id:reactionId}});
}

export { getReactionById, reactComment, updateReactComment, unreactComment };
