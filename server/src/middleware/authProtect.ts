import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';
import { findUserById } from '../services/auth';

const authProtect = asyncHandler(
  async (req: Request & {user:any}, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(
        new ErrorResponse(
          errorMessages.unauthenticated,
          StatusCodes.UNAUTHORIZED
        ) 
      );
    }
    try {
      const tokenInfo = jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET as string
      ) as { id: string };
      const user = await findUserById(tokenInfo?.id);
      if(!user) {
        return next(new ErrorResponse(errorMessages.unauthenticated,StatusCodes.UNAUTHORIZED));
      }
      const {password,...rest}=user;
      req.user=rest;
      next();
    } catch (err: any) {
      console.log(err.name,'lalala')
      return next(
        new ErrorResponse(
          err.name === 'TokenExpiredError'
            ? errorMessages.tokenExpired
            : errorMessages.unauthenticated,
          StatusCodes.UNAUTHORIZED
        )
      );
    }
  }
);

export default authProtect;
