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
        .map((item) => item.tags)
        .map((item) => item.split(','))
        .flat()
    )
  );
  return tags;
};

export { initializeItemCreation, addItem, getAllUniqueItemTags };
