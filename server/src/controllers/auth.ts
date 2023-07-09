import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import {
  compareCryptoToken,
  comparePassword,
  createUser,
  findUserByEmail,
  findUserById,
  forgotPassword,
  generateJwt,
  getMyFollows,
  hashPassword,
  resetPassword,
  updatePassword,
  updateUserInfo,
  uploadProfileImage,
  verifyEmail,
  verifyEmailAction,
} from '../services/auth';
import { findTokenByUserId, removeTokenByUserId } from '../services/token';
import {
  LoginInput,
  RegisterInput,
  UpdateTypes,
  UserUpdateInput,
} from '../types/auth';
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';
import sendEmail from '../utils/sendEmail';
import {
  generateEmailMail,
  generatePasswordMail,
} from '../utils/mailConstructor';

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
    if (user?.status === 'blocked') {
      return next(
        new ErrorResponse(errorMessages.blockedUser, StatusCodes.FORBIDDEN)
      );
    }
    if (user?.status === 'deleted') {
      return next(
        new ErrorResponse(errorMessages.deletedUser, StatusCodes.FORBIDDEN)
      );
    }
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

    const { password: pass, isEmailVerified, ...rest } = user;

    return res.status(StatusCodes.OK).json({
      success: true,
      user: { ...rest, isEmailVerified },
      accessToken,
      refreshToken,
    });
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

const logoutUser = asyncHandler(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    req.user = null;
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: 'logged_out' });
  }
);

const uploadProfileImageHandler = asyncHandler(
  async (
    req: Request<{}, {}, { image: string }> & { user: any },
    res: Response,
    next: NextFunction
  ) => {
    const image = await uploadProfileImage(req.body.image, req.user.id);
    return res.status(StatusCodes.OK).json({ success: true, data: image });
  }
);

const updateUserInfoHandler = asyncHandler(
  async (
    req: Request<{}, {}, { input: UserUpdateInput; update: UpdateTypes }> & {
      user: any;
    },
    res: Response,
    next: NextFunction
  ) => {
    const { input, update } = req.body;
    let updatedUser;
    const user = await findUserById(req.user.id);
    if (!user) {
      return next(
        new ErrorResponse(errorMessages.notFound, StatusCodes.NOT_FOUND)
      );
    }
    if (update === 'fullName' || update === 'email') {
      updatedUser = await updateUserInfo(input, req.user.id, update);
    }
    if (update === 'password') {
      const isPasswordCorrect = await comparePassword(
        input.password as string,
        user.password
      );
      if (!isPasswordCorrect) {
        return next(
          new ErrorResponse(
            errorMessages.invalidCredentials,
            StatusCodes.BAD_REQUEST
          )
        );
      }
      const hashedPassword = await hashPassword(input.newPassword as string);
      updatedUser = await updatePassword(hashedPassword, req.user.id);
    }

    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: updatedUser });
  }
);

const getMyFollowsHandler = asyncHandler(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    const followInfo = await getMyFollows(req.user.id);
    return res.status(StatusCodes.OK).json({ success: true, data: followInfo });
  }
);

const forgotPasswordHandler = asyncHandler(
  async (
    req: Request<{}, {}, { email: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return next(
        new ErrorResponse(errorMessages.userNotFound, StatusCodes.NOT_FOUND)
      );
    }
    const { email, firstName, lastName, id } = user;
    const tokenInstance = await findTokenByUserId(id, 'password');
    if (!tokenInstance) {
      const token = await forgotPassword(user.id);
      sendEmail(
        generatePasswordMail({ email, firstName, lastName, token, userId: id })
      );
    } else if (tokenInstance && tokenInstance.tokenExpire < Date.now()) {
      removeTokenByUserId(tokenInstance.id);
      const token = await forgotPassword(id);
      sendEmail(
        generatePasswordMail({ email, firstName, lastName, token, userId: id })
      );
    } else {
      return next(
        new ErrorResponse(errorMessages.emailAlreadySent, StatusCodes.FORBIDDEN)
      );
    }

    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: 'email_sent_success' });
  }
);

const resetPasswordHandler = asyncHandler(
  async (
    req: Request<{ userId: string }, {}, { token: string }>,
    res: Response,
    next: NextFunction
  ) => {
    let expired;
    const token = await findTokenByUserId(req.params.userId, 'password');
    if (!token) {
      expired = true;
    } else {
      const isTokenCorrect = compareCryptoToken(
        req.body.token,
        token.hashedToken
      );
      if (!isTokenCorrect) {
        await removeTokenByUserId(token.id);
        expired = true;
      } else {
        if (token.tokenExpire < Date.now()) {
          await removeTokenByUserId(token.id);
          expired = true;
        }
      }
    }

    return res.status(StatusCodes.OK).json({ success: true, expired });
  }
);

const resetPasswordActionHandler = asyncHandler(
  async (
    req: Request<{ userId: string }, {}, { newPassword: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const token = await resetPassword(req.body.newPassword, req.params.userId);
    if (token) {
      await removeTokenByUserId(token?.id);
    }

    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: 'password_reset_success' });
  }
);

const verifyEmailHandler = asyncHandler(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    const user = await findUserById(req.user.id)!;
    const tokenInstance = await findTokenByUserId(user?.id as string, 'email');
    
    if (!tokenInstance) {
      const token = await verifyEmail(req.user.id);
      sendEmail(
        generateEmailMail({
          email: user?.email as string,
          firstName: user?.firstName as string,
          lastName: user?.lastName as string,
          token,
          userId: user?.id as string,
        })
      );
    } else if (tokenInstance && tokenInstance.tokenExpire < Date.now()) {
      await removeTokenByUserId(tokenInstance.id);
      const token=await verifyEmail(req.user.id);
      sendEmail(
        generateEmailMail({
          email: user?.email as string,
          firstName: user?.firstName as string,
          lastName: user?.lastName as string,
          token,
          userId: user?.id as string,
        })
      );
    } else {
      return next(
        new ErrorResponse(errorMessages.emailAlreadySent, StatusCodes.FORBIDDEN)
      );
    }

    return res.status(StatusCodes.OK).json({success:true,data:'email_sent_success'})
  }
);

const verifyEmailActionHandler=asyncHandler(async(req:Request<{userId:string},{},{token:string}>,res:Response,next:NextFunction)=>{
      let expired=false;
     const tokenInstance=await findTokenByUserId(req.params.userId,'email');
     if(!tokenInstance) {
      expired=true;
     }else{
      const isTokenCorrect=compareCryptoToken(req.body.token,tokenInstance.hashedToken);
      if(!isTokenCorrect) {
        expired=true;
      }else{
        if(tokenInstance.tokenExpire < Date.now()) {
          expired=true;
        }else{
          await verifyEmailAction(req.params.userId);
        }
      }
      await removeTokenByUserId(tokenInstance.id);
     }
     return res.status(StatusCodes.OK).json({success:true,data:expired})
})

export {
  registerUser,
  loginUser,
  generateRefreshToken,
  logoutUser,
  uploadProfileImageHandler,
  updateUserInfoHandler,
  getMyFollowsHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  resetPasswordActionHandler,
  verifyEmailHandler,
  verifyEmailActionHandler
};
