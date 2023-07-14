import dbConnect from '../utils/dbConnect';

const getFullTextSearch = async (searchQuery: string) => {
  const db = await dbConnect();
  const userQuery =
    'SELECT `id`,`firstName`,`lastName`,`profileImage`,`email` FROM user WHERE MATCH(firstName,lastName,email) AGAINST(? IN BOOLEAN MODE)';
  const collectionQuery =
    'SELECT `id`,`name`,`topic`,`description`,`image` FROM collection WHERE MATCH(name,description) AGAINST(? IN BOOLEAN MODE)';
  const itemQuery =
    'SELECT `id`,`name`,`tags`,`createdAt`,`updatedAt` FROM item WHERE MATCH(name,tags) AGAINST(? IN BOOLEAN MODE)';
  const commentQuery =
    'SELECT `text` AS text,`name`,`tags`,`itemId`,`collectionId` FROM comment c JOIN item i ON c.itemId=i.id  WHERE MATCH(text) AGAINST(? IN BOOLEAN MODE)';
  const [userSearchItems] = await db.execute(userQuery, [`*${searchQuery}*`]);
  const [collectionSearchItems] = await db.execute(collectionQuery, [
    `*${searchQuery}*`,
  ]);
  const [itemSearchItems] = await db.execute(itemQuery, [`*${searchQuery}*`]);
  const [commentSearchItems] = await db.execute(commentQuery, [
    `*${searchQuery}*`,
  ]);
  return [
    {name:'user',data:userSearchItems},
    {name:'collection',data:collectionSearchItems},
    {name:'item',data:itemSearchItems},
    {name:'comment',data:commentSearchItems},
  ];
};

export { getFullTextSearch };
