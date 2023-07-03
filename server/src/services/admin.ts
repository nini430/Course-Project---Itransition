import { adminUser } from '../utils/commonQueryObjs';
import { userTableFormatter } from '../utils/formatterFns';
import client from '../utils/prismaClient';

const getAllUsers = async () => {
  const users = await client.user.findMany({
    select: adminUser,
  });
  return userTableFormatter(users);
};

const filterUsers= async(filter:string)=>{
  const users=await client.user.findMany({
    where:{
      OR:[
        {firstName:{contains:filter}},
        {lastName:{contains:filter}},
        {email:{contains:filter}},
      ]
    },
    select:adminUser
  })
  return userTableFormatter(users);
}

export { getAllUsers, filterUsers };
