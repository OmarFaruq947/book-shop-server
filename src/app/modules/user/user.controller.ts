import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully !",
    data: result,
  });
});

const deleteAUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteAUser(id);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const email = req.user?.email;

  const result = await UserService.getMyProfile(userId, email);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My Profile retrieved successfully",
    data: result,
  });
});

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  await UserService.addToWishlist(id, user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added to wishlist successfully",
  });
});

const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return;
  }
  const result = await UserService.getWishlist(user);

  sendResponse<string[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully from Wishlist",
    data: result,
  });
});

const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  if (!user) {
    return;
  }
  await UserService.removeFromWishlist(user, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book successfully remove from Wishlist",
  });
});

const addToReadingList = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  await UserService.addToReadingList(id, user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added to Reading List successfully",
  });
});

const getReadingList = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return;
  }
  const result = await UserService.getReadingList(user);

  sendResponse<string[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully from Reading List",
    data: result,
  });
});

const removeFromReadingList = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { id } = req.params;

    if (!user) {
      return;
    }
    await UserService.removeFromReadingList(user, id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book successfully remove from Reading List",
    });
  }
);

const addToFinishedReading = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  await UserService.addToFinishedReading(id, user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book added to Finished Book List successfully",
  });
});

const getFinishedReading = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!req.user) {
    return;
  }

  const result = await UserService.getFinishedReading(user);

  sendResponse<string[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully from Finished Book List",
    data: result,
  });
});

const removeFromFinishedReading = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { id } = req.params;

    if (!req.user) {
      return;
    }

    await UserService.removeFromFinishedReading(user, id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book successfully remove from Finished Books List",
    });
  }
);

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteAUser,
  getMyProfile,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  addToReadingList,
  getReadingList,
  removeFromReadingList,
  addToFinishedReading,
  getFinishedReading,
  removeFromFinishedReading,
};
