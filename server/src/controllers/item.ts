import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import {
  addItem,
  getAllUniqueItemTags,
  getItemById,
  getItemByIdExtended,
  getLatestItems,
  initializeItemCreation,
  removeItem,
  editItem,
  getMyItems,
  filterItem,
  sortItem,
  removeItems,
} from '../services/item';
import { ItemInput } from '../types/item';
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';

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

const getLatestItemsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const latestItems = await getLatestItems();
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: latestItems });
  }
);

const getItemByIdExtendedHandler = asyncHandler(
  async (
    req: Request<{ itemId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const item = await getItemByIdExtended(req.params.itemId);
    if (!item) {
      return next(
        new ErrorResponse(errorMessages.notFound, StatusCodes.NOT_FOUND)
      );
    }
    return res.status(StatusCodes.OK).json({ success: true, data: item });
  }
);

const removeItemHandler = asyncHandler(
  async (
    req: Request<{ itemId: string }> & { user: any },
    res: Response,
    next: NextFunction
  ) => {
    const item = await getItemById(req.params.itemId);

    if (!item) {
      return next(
        new ErrorResponse(errorMessages.notFound, StatusCodes.NOT_FOUND)
      );
    }

    if (item?.collection.authorId !== req.user.id) {
      return next(
        new ErrorResponse(
          errorMessages.forbiddenOperation,
          StatusCodes.FORBIDDEN
        )
      );
    }
    await removeItem(item.id);

    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: 'item_remove_success' });
  }
);

const removeItemsHandler=asyncHandler(async(req:Request<{},{},{itemIds:string[]}>,res:Response,next:NextFunction)=>{
     await removeItems(req.body.itemIds);
     return res.status(StatusCodes.OK).json({success:true,data:'items_delete_success'});
});

const editItemHandler = asyncHandler(
  async (
    req: Request<{ itemId: string }, {}, { input: Partial<ItemInput> }>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, tags, customFieldValues } = req.body.input;
    const item = await getItemById(req.params.itemId);
    if (!item) {
      return next(
        new ErrorResponse(errorMessages.notFound, StatusCodes.NOT_FOUND)
      );
    }
    const updatedItem = await editItem(
      { name, tags, customFieldValues },
      req.params.itemId
    );
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: updatedItem });
  }
);

const getMyItemsHandler = asyncHandler(
  async (
    req: Request<{ collectionId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const items = await getMyItems(req.params.collectionId);
    return res.status(StatusCodes.OK).json({ success: true, data: items });
  }
);

const filterItemHandler = asyncHandler(
  async (
    req: Request<{ collectionId: string }, {}, { filter: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const items = await filterItem(req.body.filter, req.params.collectionId);
    return res.status(StatusCodes.OK).json({ success: true, data: items });
  }
);

const sortItemHandler = asyncHandler(
  async (
    req: Request<
      { collectionId: string },
      {},
      { sortedCol: string; sortedDir: 'asc' | 'desc' }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const items = await sortItem(
      req.body.sortedCol,
      req.body.sortedDir,
      req.params.collectionId
    );
    return res.status(StatusCodes.OK).json({ success: true, data: items });
  }
);
export {
  initializeItemCreationHandler,
  addItemHandler,
  getUniqueItemTagsHandler,
  getLatestItemsHandler,
  getItemByIdExtendedHandler,
  removeItemHandler,
  editItemHandler,
  getMyItemsHandler,
  filterItemHandler,
  sortItemHandler,
  removeItemsHandler
};
