import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import {
  comparePassword,
  createUser,
  findUserByEmail,
  generateJwt,
} from '../services/auth';
import { LoginInput, RegisterInput } from '../types/auth';
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';

const registerUser = asyncHandler(
  async (
    req: Request<{}, {}, RegisterInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return next(
        new ErrorResponse(errorMessages.missingFields, StatusCodes.BAD_REQUEST)
      );
    }
    const { password: pass, ...rest } = await createUser({
      firstName,
      lastName,
      email,
      password,
    });
    return res.status(StatusCodes.CREATED).json({ success: true, user: rest });
  }
);

const loginUser = asyncHandler(
  async (
    req: Request<{}, {}, LoginInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new ErrorResponse(errorMessages.missingFields, StatusCodes.BAD_REQUEST)
      );
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return next(
        new ErrorResponse(
          errorMessages.invalidCredentials,
          StatusCodes.BAD_REQUEST
        )
      );
    }
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return next(
        new ErrorResponse(
          errorMessages.invalidCredentials,
          StatusCodes.BAD_REQUEST
        )
      );
    }

    const accessToken = generateJwt(
      user.id,
      process.env.JWT_ACCESS_TOKEN_SECRET as string,
      process.env.JWT_ACCESS_TOKEN_EXPIRE_MIN as string
    );
    const refreshToken = generateJwt(
      user.id,
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      process.env.JWT_REFRESH_TOKEN_EXPIRE_MIN as string
    );

    const { password: pass, ...rest } = user;

    return res
      .status(StatusCodes.OK)
      .json({ success: true, user: rest, accessToken, refreshToken });
  }
);

const generateRefreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.headers.authorization?.split(' ')[1];
    if (!refreshToken) {
      return next(
        new ErrorResponse(
          errorMessages.unauthenticated,
          StatusCodes.UNAUTHORIZED
        )
      );
    }

    try {
      const tokenInfo = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET as string
      ) as { id: string };
      console.log(tokenInfo);
      if (tokenInfo.id) {
        const accessToken = generateJwt(
          tokenInfo.id,
          process.env.JWT_ACCESS_TOKEN_SECRET as string,
          process.env.JWT_ACCESS_TOKEN_EXPIRE_MIN as string
        );
        return res.status(StatusCodes.OK).json({ success: true, accessToken });
      }
    } catch (err: any) {
      console.log(err);
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

export { registerUser, loginUser, generateRefreshToken };
