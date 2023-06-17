import client from '../utils/prismaClient';
import { CollectionInput } from '../types/collection';
import { uploadImage } from './common';

const addCollection = async (input: CollectionInput, authorId: string) => {
  let { name, description, topic, image } = input;
  if (image) {
    image = await uploadImage(image);
  }
  try{
    const newCollection = await client.collection.create({
    data: { name, description, topic, image, authorId },
  });
  return newCollection;
  }catch(err) {
    console.log(err)
  }
  
};

export { addCollection };
