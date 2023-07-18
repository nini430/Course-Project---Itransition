import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { COLLECTION_TOPICS } from '../utils/constants';
import { CollectionInput } from '../types/collection';
import {
  addCollection,
  addItemConfigs,
  findCollectionById,
  findCollectionByIdExtended,
  getCollectionExtended,
  getMyCollections,
  getTopLargestCollections,
  removeCollection,
  updateCollection,
  updateCollectionImage,
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
    req: Request<{}, {}, { input: CollectionInput; configs: any, ownerId:string }> & {
      user: any, ownerId: string;
    },
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, topic, image} = req.body.input;
    const newCollection = await addCollection(
      { name, description, topic, image },
      req.ownerId 
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
    req: Request<{ collectionId: string }> & { usser: any },
    res: Response,
    next: NextFunction
  ) => {
    const collection = await findCollectionById(req.params.collectionId);
    if (!collection) {
      return next(
        new ErrorResponse(errorMessages.notFound, StatusCodes.NOT_FOUND)
      );
    }
    if (collection.authorId !== req.usser.id) {
      return next(
        new ErrorResponse(
          errorMessages.forbiddenOperation,
          StatusCodes.FORBIDDEN
        )
      );
    }

    await removeCollection(req.params.collectionId);

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'deleted' });
  }
);

const getMyCollectionsHandlerHandler = asyncHandler(
  async (
    req: Request<{ authorId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const user = await getMyCollections(req.params.authorId);
    return res.status(StatusCodes.OK).json({ success: true, data: user });
  }
);

const getCollectionById = asyncHandler(
  async (
    req: Request<{ collectionId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const collection = await findCollectionByIdExtended(
      req.params.collectionId
    );
    if (!collection) {
      return next(
        new ErrorResponse(errorMessages.notFound, StatusCodes.NOT_FOUND)
      );
    }
    return res.status(StatusCodes.OK).json({ success: true, data: collection });
  }
);

const updateCollectionImageHandler = asyncHandler(
  async (
    req: Request<{ collectionId: string }, {}, { image: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const collection = await findCollectionById(req.params.collectionId);
    if (!collection) {
      return next(
        new ErrorResponse(errorMessages.notFound, StatusCodes.NOT_FOUND)
      );
    }
    const image = await updateCollectionImage(
      req.params.collectionId,
      req.body.image
    );
    return res.status(StatusCodes.OK).json({ success: true, data: image });
  }
);

const getCollectionExtendedHandler = asyncHandler(
  async (
    req: Request<{ collectionId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const collectionDetails = await getCollectionExtended(
      req.params.collectionId
    );
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: collectionDetails });
  }
);

const updateCollectionHandler = asyncHandler(
  async (
    req: Request<{ collectionId: string },{},{configs:any,input:CollectionInput}>,
    res: Response,
    next: NextFunction
  ) => {
    const {configs,input}=req.body;
    const collection = await findCollectionById(req.params.collectionId);
    if (!collection) {
      return next(
        new ErrorResponse(errorMessages.notFound, StatusCodes.NOT_FOUND)
      );
    }
    await updateCollection(collection.image,collection.id,configs,input);
    return res.status(StatusCodes.OK).json({success:true,data:'collection_updated'});
  }
);
export {
  getCollectionTopics,
  addCollectionHandler,
  getTopLargestCollectionsHandler,
  removeCollectionHandler,
  getMyCollectionsHandlerHandler,
  getCollectionById,
  updateCollectionImageHandler,
  getCollectionExtendedHandler,
  updateCollectionHandler,
};
