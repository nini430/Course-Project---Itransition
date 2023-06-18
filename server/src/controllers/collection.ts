import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { COLLECTION_TOPICS } from '../utils/constants';
import { CollectionInput } from '../types/collection';
import { addCollection, addItemConfigs } from '../services/collection';

const getCollectionTopics = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: COLLECTION_TOPICS });
  }
);

const addCollectionHandler = asyncHandler(
  async (
    req: Request<{}, {}, {input:CollectionInput,configs:any}> & { user: any },
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, topic, image } = req.body.input;
    const newCollection = await addCollection(
      { name, description, topic, image },
      req.user.id
    );
    await addItemConfigs(req.body.configs,newCollection?.id as string);
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, collection: newCollection });
  }
);


export { getCollectionTopics, addCollectionHandler };
