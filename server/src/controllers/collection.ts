import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { COLLECTION_TOPICS } from '../utils/constants';
import { CollectionInput } from '../types/collection';
import {
  addCollection,
  addItemConfigs,
  findCollectionById,
  getMyCollections,
  getTopLargestCollections,
  removeCollection,
} from '../services/collection';
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';

const getCollectionTopics = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: COLLECTION_TOPICS });
  }
);

const addCollectionHandler = asyncHandler(
  async (
    req: Request<{}, {}, { input: CollectionInput; configs: any }> & {
      user: any;
    },
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, topic, image } = req.body.input;
    const newCollection = await addCollection(
      { name, description, topic, image },
      req.user.id
    );
    await addItemConfigs(req.body.configs, newCollection?.id as string);
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, collection: newCollection });
  }
);

const getTopLargestCollectionsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const topLargestCollections = await getTopLargestCollections();
    console.log(topLargestCollections);
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: topLargestCollections });
  }
);

const removeCollectionHandler = asyncHandler(
  async (
    req: Request<{ collectionId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const collection = await findCollectionById(req.params.collectionId);
    if (!collection) {
      return next(
        new ErrorResponse(errorMessages.notFound, StatusCodes.NOT_FOUND)
      );
    }
    await removeCollection(req.params.collectionId);

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'deleted' });
  }
);

const getMyCollectionsHandlerHandler = asyncHandler(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    const user = await getMyCollections(req.user.id);
    return res.status(StatusCodes.OK).json({ success: true, data: user });
  }
);

export {
  getCollectionTopics,
  addCollectionHandler,
  getTopLargestCollectionsHandler,
  removeCollectionHandler,
  getMyCollectionsHandlerHandler,
};
