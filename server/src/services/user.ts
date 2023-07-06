import { simpleUser } from '../utils/commonQueryObjs';
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
      accountStatus:true,
      followedIds: {
        include: {
          follower: {
            select: simpleUser,
          },
        },
      },
      followerIds: {
        include: {
          followed: {
            select: simpleUser,
          },
        },
      },
    },
  });
  return user;
};

const followUser = async (followerId: string, followedId: string) => {
  const followInstance = await client.follow.create({
    data: { followedId, followerId },
    include: {
      followed: {
        select: simpleUser,
      },
      follower: {
        select: simpleUser,
      },
    },
  });
  return followInstance;
};

const unfollowUser = async (followInstanceId: string) => {
  await client.follow.delete({ where: { id: followInstanceId } });
};

const doesAlreadyFollow = async (followerId: string, followedId: string) => {
  const alreadyFollows = await client.follow.findFirst({
    where: { followedId, followerId },
    include: {
      followed: {
        select: simpleUser
      },
      follower: {
        select:simpleUser,
      },
    },
  });
  return alreadyFollows;
};
export { getUserById, unfollowUser, followUser, doesAlreadyFollow };
