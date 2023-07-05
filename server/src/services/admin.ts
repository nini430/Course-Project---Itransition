import { RegisterInput } from '../types/auth';
import { adminUser } from '../utils/commonQueryObjs';
import { userTableFormatter } from '../utils/formatterFns';
import client from '../utils/prismaClient';
import { hashPassword } from './auth';

const getAllUsers = async () => {
  const users = await client.user.findMany({
    select: adminUser,
  });
  return userTableFormatter(users);
};

const filterUsers = async (filter: string) => {
  const users = await client.user.findMany({
    where: {
      OR: [
        { firstName: { contains: filter } },
        { lastName: { contains: filter } },
        { email: { contains: filter } },
      ],
    },
    select: adminUser,
  });
  return userTableFormatter(users);
};

const editUser = async (
  userId: string,
  inputs: Partial<RegisterInput>,
  oldPassword: string
) => {
  let newPassword;
  let { firstName, lastName, email, password } = inputs;
  if (inputs.password) {
    newPassword = await hashPassword(password as string);
  }
  const updatedUser = await client.user.update({
    data: {
      firstName,
      lastName,
      email,
      password: newPassword ? newPassword : oldPassword,
    },
    where: { id: userId },
    select:adminUser
  });
  return userTableFormatter([updatedUser]);
};
export { getAllUsers, filterUsers, editUser };
