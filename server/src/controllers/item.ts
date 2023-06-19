import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import {
  addItem,
  getAllUniqueItemTags,
  initializeItemCreation,
} from '../services/item';
import { ItemInput } from '../types/item';

const initializeItemCreationHandler = asyncHandler(
  async (
    req: Request<{ collectionId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const itemConfigFields = await initializeItemCreation(
      req.params.collectionId
    );
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: itemConfigFields });
  }
);

const addItemHandler = asyncHandler(
  async (
    req: Request<{ collectionId: string }, {}, ItemInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, tags, customFieldValues } = req.body;
    const newItem = await addItem(req.params.collectionId, {
      name,
      tags,
      customFieldValues,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ success: false, data: newItem });
  }
);

const getUniqueItemTagsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tags = await getAllUniqueItemTags();
    return res.status(StatusCodes.OK).json({ success: true, data: tags });
  }
);

export {
  initializeItemCreationHandler,
  addItemHandler,
  getUniqueItemTagsHandler,
};
