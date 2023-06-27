import { Emojis } from '@prisma/client';
import { ItemReaction } from '../types/itemReaction';
import client from '../utils/prismaClient';

const addReaction = async (input: ItemReaction) => {
  const { name, userId, itemId } = input;
  const reaction = await client.itemReaction.create({
    data: { name: name as Emojis, userId, itemId },
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

const getReactionById=async(reactionId:string)=>{
    const reaction = await client.itemReaction.findUnique({where:{id:reactionId}});
    return reaction;
}

const updateReaction = async (reactionId: string, name: Emojis) => {
  const updatedReaction = await client.itemReaction.update({
    data: { name },
    where: { id: reactionId },
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
  return updatedReaction;
};

const unreactItem=async(reactionId:string)=>{
   await client.itemReaction.delete({where:{id:reactionId}});
}

export { addReaction, updateReaction, unreactItem, getReactionById };
