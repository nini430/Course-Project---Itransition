import client from '../utils/prismaClient';

const findTokenByUserId = async (userId: string) => {
  const token = await client.token.findUnique({ where: { userId } });
  return token;
};

const removeTokenByUserId = async(userId:string)=>{
    await client.token.delete({where:{userId}});
}

export { findTokenByUserId, removeTokenByUserId };
