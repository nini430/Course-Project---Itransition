import client from '../utils/prismaClient';

const getUserById = async (userId: string) => {
  const user = await client.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      collections: { select: { name: true } },
      email: true,
      id: true,
      password: false,
      profileImage: true,
      role: true,
      followedIds:true,
      followerIds:true
    },
  });
  return user;
};




const followUser=async(followerId:string,followedId:string)=>{
  const followInstance=await client.follow.create({data:{followedId,followerId}});
  return followInstance;
}


const unfollowUser=async(followInstanceId:string)=>{
  await client.follow.delete({where:{id:followInstanceId}});
}

const doesAlreadyFollow=async(followerId:string,followedId:string)=>{
    const alreadyFollows=await client.follow.findFirst({where:{followedId,followerId}});
    return alreadyFollows;
}
export { getUserById, unfollowUser, followUser, doesAlreadyFollow};
