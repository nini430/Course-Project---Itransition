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


const getTopLargestCollections=async()=>{
    const largestCollections=await client.collection.findMany({take:5,orderBy:{items:{_count:'desc'}},include:{items:true}});
    return largestCollections;
}


export { addCollection, addItemConfigs, getTopLargestCollections };
