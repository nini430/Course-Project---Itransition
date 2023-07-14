import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { getFullTextSearch } from '../services/search';
import { StatusCodes } from 'http-status-codes';

const getFullTextSearchHandler = asyncHandler(
  async (
    req: Request<{}, {}, { searchQuery: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const searchItems = await getFullTextSearch(req.body.searchQuery);
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: searchItems });
  }
);

export { getFullTextSearchHandler };
