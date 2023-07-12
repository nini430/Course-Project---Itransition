import { Item } from '../types/item';

const itemTableFormatter = (items: any[]) => {
  return items.map((item) => ({
    name: item.name,
    tags: item.tags
      .split(',')
      .map((tag: string) => `#${tag}`)
      .join(','),
    reactions: { count: true, data: item.reactions, name:'react' },
    comments: { count: true, data: item.comments, name:'comments' },
    createdAt: { date: true, data: item.createdAt },
    collection: {
      foreign: true,
      name:'collection',
      id:item.collection.id,
      data: {
        name: item.collection.name,
        id: item.collection.id,
        src: item.collection.image,
        fallbackSrc: 'no-image'
      },
    },
    author: {
      name:'profile',
      id:item.collection.author.id,
      foreign: true,
      data: {
        name: `${item.collection.author.firstName} ${item.collection.author.lastName}`,
        id: item.collection.author.id,
        src: item.collection.author.profileImage,
        fallbackSrc: 'avatar'
      },
    },
    customFields: { action: true, data: 'View', fields:item.customFieldValues, custom:true, id:item.id },
  }));
};
  
const userTableFormatter=(users:any[])=>{
   return users.map(user=>({
    id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      status: {status:true,data:user.status},
      role:user.role==='BASIC'?'user':'admin',
      profileImage: {foreign:true,data:{src:user.profileImage, fallbackSrc:'avatar'}},
      collections:{count:true,data:user.collections,name:'collection'},
      createdAt:{date:true, data: user.createdAt},
      followers:{count:true,data:user.followerIds.map((item:any)=>item.followed),name:'follow'},
      followings:{count:true,data:user.followedIds.map((item:any)=>item.follower),name:'follow'},
      view:{action:true,data:'View',link:`/profile/${user.id}`},
      edit:{action:true,data:'Edit',name:'edit',link:`/edit-user/${user.id}`}
   }))
}

export { itemTableFormatter, userTableFormatter };
