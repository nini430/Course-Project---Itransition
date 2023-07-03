const simpleUser = {
  firstName: true,
  lastName: true,
  id: true,
  profileImage: true,
};

const adminUser = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  profileImage: true,
  password: false,
  createdAt: true,
  collections: true,
  followedIds: { include: { followed: true, follower: true } },
  followerIds: { include: { followed: true, follower: true } },
};

export { simpleUser, adminUser };
