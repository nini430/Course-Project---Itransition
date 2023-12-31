import client from '../utils/prismaClient';
import { CollectionInput } from '../types/collection';
import { uploadImage } from './common';
import { CustomTableConfigNames } from '../types/common';

const addCollection = async (input: CollectionInput, authorId: string) => {
  let { name, description, topic, image } = input;
  if (image) {
    image = await uploadImage(image);
  }
  const newCollection = await client.collection.create({
    data: { name, description, topic, image, authorId },
  });
  return newCollection;
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
    include: {
      items: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
          id: true,
          profileImage: true,
        },
      },
    },
  });
  return largestCollections;
};

const getMyCollections = async (userId: string) => {
  const collectionsInfo = await client.user.findUnique({
    where: { id: userId },
    select: {
      collections: {
        include: {
          items: { select: { name: true } },
          author: {
            select: {
              firstName: true,
              lastName: true,
              role: true,
              profileImage: true,
              id: true,
            },
          },
        },
      },
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
          id: true,
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

const updateCollectionImage = async (
  collectionId: string,
  imageBase64: string
) => {
  const image = await uploadImage(imageBase64);
  await client.collection.update({
    data: { image },
    where: { id: collectionId },
  });
  return image;
};

const getCollectionExtended = async (collectionId: string) => {
  const collection = await client.collection.findUnique({
    where: { id: collectionId },
    select: { name: true, description: true, topic: true, image: true },
  });
  const integerField = await client.integerField.findMany({
    where: { collectionId },
  });
  const dateField = await client.dateField.findMany({
    where: { collectionId },
  });
  const multilineTextField = await client.multilineTextField.findMany({
    where: { collectionId },
  });
  const booleanCheckboxField = await client.booleanCheckboxField.findMany({
    where: { collectionId },
  });
  const stringField = await client.stringField.findMany({
    where: { collectionId },
  });
  return {
    collection,
    integerField,
    dateField,
    multilineTextField,
    booleanCheckboxField,
    stringField,
  };
};

const updateConfig = async (configs: any) => {
  for (const fields in configs) {
    await Promise.all(
      configs[fields].map(async (item: any) => {
        await (client[fields as CustomTableConfigNames] as any).update({
          data: { name: item.name },
          where: { id: item.id },
        });
      })
    );
  }
};

const updateCollection = async (
  collectionImage: string | null,
  collectionId: string,
  configs: any,
  input: CollectionInput
) => {
  let updatedImage = collectionImage;
  if (input.image) {
    updatedImage = await uploadImage(input.image);
  }
  await client.collection.update({
    data: {
      image: updatedImage,
      description: input.description,
      topic: input.topic,
      name: input.name,
    },
    where: { id: collectionId },
  });
  await updateConfig(configs);
};

export {
  addCollection,
  addItemConfigs,
  getTopLargestCollections,
  findCollectionById,
  removeCollection,
  getMyCollections,
  findCollectionByIdExtended,
  updateCollectionImage,
  getCollectionExtended,
  updateCollection,
};
