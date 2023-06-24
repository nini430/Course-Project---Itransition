import client from "../utils/prismaClient";


const getUserById=async(userId:string)=>{
    const user=await client.user.findUnique({where:{id:userId},select:{firstName:true,lastName:true,collections:{select:{name:true}},email:true, id:true,password:false,profileImage:true,role:true}});
    return user;
}


export {getUserById};