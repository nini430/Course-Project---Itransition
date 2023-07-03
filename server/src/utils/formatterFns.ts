import { Item } from '../types/item';

const itemTableFormatter = (items: any[]) => {
  return items.map((item) => ({
    name: item.name,
    tags: item.tags
      .split(',')
      .map((tag: string) => `#${tag}`)
      .join(','),
    reactions: { count: true, data: item.reactions },
    comments: { count: true, data: item.comments },
    createdAt: { date: true, data: item.createdAt },
    collection: {
      foreign: true,
      data: {
        name: item.collection.name,
        id: item.collection.id,
        src: item.collection.image,
        fallbackSrc: 'no-image'
      },
    },
    author: {
      foreign: true,
      data: {
        name: `${item.collection.author.firstName} ${item.collection.author.lastName}`,
        id: item.collection.author.id,
        src: item.collection.author.profileImage,
        fallbackSrc: 'avatar'
      },
    },
    customFields: { custom: true, data: item.customFieldValues },
  }));
};

const userTableFormatter=(users:any[])=>{
   return users.map(user=>({
    id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      role:user.role==='BASIC'?'user':'admin',
      profileImage: {foreign:true,data:{src:user.profileImage, fallbackSrc:'avatar'}},
      collections:{count:true,data:user.collections},
      createdAt:{date:true, data: user.createdAt},
      followers:{count:true,data:user.followerIds},
      followings:{count:true,data:user.followedIds}
   }))
}

export { itemTableFormatter, userTableFormatter };
