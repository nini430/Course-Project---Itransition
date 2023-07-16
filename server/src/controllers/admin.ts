import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import {
  changeUsersRole,
  changeUsersStatus,
  editUser,
  filterUsers,
  getAllUsers,
  sortUsers,
} from '../services/admin';
import { findUserById } from '../services/auth';
import { RegisterInput } from '../types/auth';
import ErrorResponse from '../utils/errorResponse';
import errorMessages from '../utils/errorMessages';
import { Statuses } from '../types/common';
import { Role } from '@prisma/client';

const getAllUsersHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await getAllUsers();
    return res.status(StatusCodes.OK).json({ success: true, data: users });
  }
);

const filterUsersHandler = asyncHandler(
  async (
    req: Request<{}, {}, { filter: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const filteredUsers = await filterUsers(req.body.filter);
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: filteredUsers });
  }
);

const sortUsersHandler = asyncHandler(
  async (
    req: Request<{}, {}, { sortedCol: string; sortedDir: 'asc' | 'desc' }>,
    res: Response,
    next: NextFunction
  ) => {
    const { sortedCol, sortedDir } = req.body;
    const users = await sortUsers(sortedCol, sortedDir);
    return res.status(StatusCodes.OK).json({ success: true, data: users });
  }
);

const editUserHandler = asyncHandler(
  async (
    req: Request<{ userId: string }, {}, { inputs: RegisterInput }>,
    res: Response,
    next: NextFunction
  ) => {
    const user = await findUserById(req.params.userId);
    if (!user) {
      return next(
        new ErrorResponse(errorMessages.notFound, StatusCodes.NOT_FOUND)
      );
    }
    const updatedUser = await editUser(
      req.params.userId,
      req.body.inputs,
      user.password as string
    );
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: updatedUser });
  }
);

const changeUsersStatusHandler = asyncHandler(
  async (
    req: Request<{}, {}, { userIds: string[]; status: Statuses }>,
    res: Response,
    next: NextFunction
  ) => {
    const { status, userIds } = req.body;
    await changeUsersStatus(userIds, status);
    return res.status(StatusCodes.OK).json({ success: true, data: 'users_updated' });
  }
);

const changeUsersRoleHandler= asyncHandler(async(req:Request<{},{},{userIds:string[],role:Role}>,res:Response,next:NextFunction)=>{
    const {userIds,role}=req.body;
    await changeUsersRole(userIds,role);
    return res.status(StatusCodes.OK).json({success:true,data:'users_updated'})
})

export {
  getAllUsersHandler,
  filterUsersHandler,
  editUserHandler,
  changeUsersStatusHandler,
  sortUsersHandler,
  changeUsersRoleHandler
};
