import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';

const authProtect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return new ErrorResponse(
      errorMessages.unauthenticated,
      StatusCodes.UNAUTHORIZED
    );
  }

  try {
    const nini = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    );
    console.log(nini);
  } catch (err) {
    return new ErrorResponse(
      errorMessages.unauthenticated,
      StatusCodes.UNAUTHORIZED
    );
  }
};

export default authProtect;
