import client from '../utils/prismaClient';

const findTokenByUserId = async (userId: string,name:string) => {
  const token = await client.token.findFirst({ where: { userId, name } });
  return token;
};

const removeTokenByUserId = async(id:string)=>{
    await client.token.delete({where:{id}});
}

export { findTokenByUserId, removeTokenByUserId };
