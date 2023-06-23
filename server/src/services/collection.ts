import client from '../utils/prismaClient';
import { CollectionInput } from '../types/collection';
import { uploadImage } from './common';
import { CustomTableConfigNames } from '../types/common';

const addCollection = async (input: CollectionInput, authorId: string) => {
  let { name, description, topic, image } = input;
  if (image) {
    image = await uploadImage(image);
  }
  try {
    const newCollection = await client.collection.create({
      data: { name, description, topic, image, authorId },
    });
    return newCollection;
  } catch (err) {
    console.log(err);
  }
};

const addItemConfigs = async (
  itemConfigs: {
    [key in CustomTableConfigNames]: any;
  },
  collectionId: string
) => {
  for (const fields in itemConfigs) {
    const actualValues = Object.values(
      itemConfigs[fields as CustomTableConfigNames]
    );
    await Promise.all(
      actualValues.map(async (item: any) => {
        await (client[fields as CustomTableConfigNames] as any).create({
          data: { name: item, collectionId },
        });
      })
    );
  }
};

const getTopLargestCollections = async () => {
  const largestCollections = await client.collection.findMany({
    take: 5,
    orderBy: { items: { _count: 'desc' } },
    include: { items: true },
  });
  return largestCollections;
};

const getMyCollections = async (userId: string) => {
  const collectionsInfo = await client.user.findUnique({
    where: { id: userId },
    select: {
      collections: { include: { items: { select: { name: true } } } },
    },
  });
  return collectionsInfo;
};

const findCollectionById = async (collectionId: string) => {
  const collection = await client.collection.findUnique({
    where: { id: collectionId },
  });
  return collection;
};

const findCollectionByIdExtended = async (collectionId: string) => {
  const collection = await client.collection.findUnique({
    where: { id: collectionId },
    include: {
      items: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
          id:true,
          profileImage: true,
          collections: { select: { name: true } },
        },
      },
    },
  });
  return collection;
};

const removeCollection = async (collectionId: string) => {
  await client.collection.delete({ where: { id: collectionId } });
};

const updateCollectionImage=async(collectionId:string,imageBase64:string)=>{
  const image=await uploadImage(imageBase64);
  await client.collection.update({data:{image},where:{id:collectionId}});
  return image;
}

export {
  addCollection,
  addItemConfigs,
  getTopLargestCollections,
  findCollectionById,
  removeCollection,
  getMyCollections,
  findCollectionByIdExtended,
  updateCollectionImage
};
