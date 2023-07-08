import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import client from '../utils/prismaClient';
import { RegisterInput, UpdateTypes, UserUpdateInput } from '../types/auth';
import { uploadImage } from './common';

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

const comparePassword = async (candidatePassword: string, password: string) => {
  const isPasswordCorrect = await bcrypt.compare(candidatePassword, password);
  return isPasswordCorrect;
};

const findUserByEmail = async (email: string) => {
  const user = await client.user.findFirst({
    where: { email },
    include: { followedIds: true, followerIds: true },
  });
  return user;
};

const hashCryptoToken = () => {
  const token = crypto.randomBytes(20).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  return { token, hashedToken };
};

const compareCryptoToken = (token: string, userHashedToken: string) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  return hashedToken===userHashedToken;
};

const resetPassword=async(token:string)=>{
     
}


const forgotPassword = async (userId: string) => {
  const { token, hashedToken } = hashCryptoToken();
  const tokenExpire = Date.now() + 10 * 60 * 1000;
  await client.token.create({data:{userId,tokenExpire,hashedToken}});
  return token;
};

const generateJwt = (userId: string, secret: string, expiresIn: string) => {
  const token = jwt.sign({ id: userId }, secret, { expiresIn });
  return token;
};

const findUserByIdWithoutPass = async (id: string) => {
  const user = await client.user.findUnique({
    where: { id },
    select: {
      firstName: true,
      lastName: true,
      profileImage: true,
      id: true,
      role: true,
    },
  });
  return user;
};

const findUserById = async (id: string) => {
  const user = await client.user.findUnique({ where: { id } });
  return user;
};

const createUser = async (input: RegisterInput) => {
  const hashedPassword = await hashPassword(input.password);
  const user = await client.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: hashedPassword,
    },
  });
  return user;
};

const uploadProfileImage = async (imageBase64: string, userId: string) => {
  const img = await uploadImage(imageBase64);
  await client.user.update({
    data: { profileImage: img },
    where: { id: userId },
  });
  return img;
};

const updateUserInfo = async (
  input: UserUpdateInput,
  userId: string,
  update: UpdateTypes
) => {
  const { firstName, lastName, email } = input;
  const updatedUser = await client.user.update({
    data: update === 'fullName' ? { firstName, lastName } : { email },
    where: { id: userId },
  });
  const { password, ...rest } = updatedUser;
  return rest;
};

const updatePassword = async (newPassword: string, userId: string) => {
  const updatedUser = await client.user.update({
    data: { password: newPassword },
    where: { id: userId },
  });
  const { password, ...rest } = updatedUser;
  return rest;
};

const getMyFollows = async (userId: string) => {
  const followers = await client.follow.findMany({
    where: { followedId: userId },
  });
  const followings = await client.follow.findMany({
    where: { followerId: userId },
  });
  console.log(followers, followings, userId);
  return { followers, followings };
};
export {
  hashPassword,
  createUser,
  findUserById,
  comparePassword,
  findUserByEmail,
  generateJwt,
  uploadProfileImage,
  updateUserInfo,
  updatePassword,
  getMyFollows,
  findUserByIdWithoutPass,
  forgotPassword,
  resetPassword,
};
