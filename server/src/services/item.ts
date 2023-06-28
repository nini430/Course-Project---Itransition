import { ItemInput } from '../types/item';
import client from '../utils/prismaClient';

const initializeItemCreation = async (collectionId: string) => {
  let customItemFields = {} as any;

  const integerFields = await client.integerField.findMany({
    where: { collectionId },
  });
  const stringFields = await client.stringField.findMany({
    where: { collectionId },
  });
  const booleanFields = await client.booleanCheckboxField.findMany({
    where: { collectionId },
  });
  const multilineFields = await client.multilineTextField.findMany({
    where: { collectionId },
  });
  const dateFields = await client.dateField.findMany({
    where: { collectionId },
  });

  customItemFields['integer'] = integerFields;
  customItemFields['string'] = stringFields;
  customItemFields['boolean'] = booleanFields;
  customItemFields['multiline'] = multilineFields;
  customItemFields['date'] = dateFields;

  return customItemFields;
};

const addItem = async (collectionId: string, input: ItemInput) => {
  const { name, tags, customFieldValues } = input;
  const newItem = await client.item.create({
    data: {
      name,
      tags,
      customFieldValues,
      collectionId,
    },
  });
  return newItem;
};

const getAllUniqueItemTags = async () => {
  const tags = Array.from(
    new Set(
      (await client.item.findMany({ select: { tags: true } }))
        .map((item: any) => item.tags)
        .map((item: any) => item.split(','))
        .flat()
    )
  );
  return tags;
};

const getLatestItems = async () => {
  const latestItems = await client.item.findMany({
    take: 5,
    orderBy: { updatedAt: 'desc' },
    include: {
      collection: {
        include: {
          author: {
            select: {
              firstName: true,
              id: true,
              lastName: true,
              profileImage: true,
            },
          },
        },
      },
    },
  });
  return latestItems;
};

const getItemById = async (itemId: string) => {
  const item = await client.item.findUnique({
    where: { id: itemId },
    include: { collection: { select: { authorId: true } } },
  });
  return item;
};

const getItemByIdExtended = async (itemId: string) => {
  const item = await client.item.findUnique({
    where: { id: itemId },
    include: {
      collection: {
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              id: true,
              profileImage: true,
            },
          },
        },
      },
      comments: {
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true,
              id: true,
            },
          },
          reactions: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  profileImage: true,
                  id: true,
                },
              },
            },
          },
        },
      },
      reactions: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return item;
};

const removeItem = async (itemId: string) => {
  await client.item.delete({ where: { id: itemId } });
};

const editItem = async (input: Partial<ItemInput>, itemId: string) => {
  const { customFieldValues, name, tags } = input;
  const updatedItem = await client.item.update({
    data: { name, tags, customFieldValues },
    where: { id: itemId },
  });
  return updatedItem;
};

const getMyItems = async (userId: string) => {
  console.log('lol')
  const items = await client.item.findMany({
    where: { collection: { authorId: userId } },
    include: {
      collection: {
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              profileImage: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return items;
};

export {
  initializeItemCreation,
  addItem,
  getAllUniqueItemTags,
  getLatestItems,
  getItemById,
  getItemByIdExtended,
  removeItem,
  editItem,
  getMyItems,
};
