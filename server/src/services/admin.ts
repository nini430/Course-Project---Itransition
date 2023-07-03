import { userTableFormatter } from '../utils/formatterFns';
import client from '../utils/prismaClient';

const getAllUsers = async () => {
  const users = await client.user.findMany({
    select: {
      id:true,
      firstName: true,
      lastName: true,
      email: true,
      role:true,
      profileImage:true,
      password: false,
      createdAt:true,
      collections: true,
      followedIds: { include: { followed: true, follower: true } },
      followerIds: { include: { followed: true, follower: true } },
    },
  });
  return userTableFormatter(users);
};

export { getAllUsers };
