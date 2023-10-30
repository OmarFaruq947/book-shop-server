import { JwtPayload } from "jsonwebtoken";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { IBook } from "../book/book.interface";

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteAUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOneAndDelete({ _id: id });
  return result;
};

const getMyProfile = async (
  userId: string,
  email: string
): Promise<IUser | null> => {
  const result = await User.findById({ _id: userId, authorEmail: email });
  return result;
};

const addToWishlist = async (id: string, user: JwtPayload): Promise<void> => {
  const { userId } = user;
  const userInfo = await User.findById(userId);

  if (userInfo?.wishlist.includes(id)) {
    throw new Error("Book already exists in the wishlist");
  }
  await User.findByIdAndUpdate(
    userId,
    {
      $push: { wishlist: id },
    },
    {
      new: true,
    }
  );
};

const getWishlist = async (user: JwtPayload): Promise<string[]> => {
  const userInfo = await User.findById(user.userId).populate("wishlist");

  if (!userInfo) {
    throw new Error("User not found");
  }

  return userInfo.wishlist;
};

const removeFromWishlist = async (
  user: JwtPayload,
  id: string
): Promise<void> => {
  await User.findOneAndUpdate(
    {
      _id: user.userId,
    },
    {
      $pull: { wishlist: id },
    },
    {
      new: true,
    }
  );
};

const addToReadingList = async (
  id: string,
  user: JwtPayload
): Promise<void> => {
  const { userId } = user;
  const userInfo = await User.findById(userId);

  if (!userInfo) {
    throw new Error("User not found");
  }

  if (userInfo.readingList.includes(id)) {
    throw new Error("Book already exists in the Reading List");
  }

  const bookIndex = userInfo.wishlist.indexOf(id);
  if (bookIndex !== -1) {
    userInfo.wishlist.splice(bookIndex, 1);
  }

  await User.findByIdAndUpdate(
    userId,
    {
      $push: { readingList: id },
    },
    {
      new: true,
    }
  );
};

const getReadingList = async (user: JwtPayload): Promise<string[]> => {
  const userInfo = await User.findById(user.userId).populate("readingList");

  if (!userInfo) {
    throw new Error("User not found");
  }

  return userInfo.readingList;
};

const removeFromReadingList = async (
  user: JwtPayload,
  id: string
): Promise<void> => {
  await User.findOneAndUpdate(
    {
      _id: user.userId,
    },
    {
      $pull: { readingList: id },
    },
    {
      new: true,
    }
  );
};

const addToFinishedReading = async (
  id: string,
  user: JwtPayload
): Promise<void> => {
  const { userId } = user;
  const userInfo = await User.findById(userId);

  if (!userInfo) {
    throw new Error("User not found");
  }

  if (userInfo.finishedReading.includes(id)) {
    throw new Error("Book already exists in the Finished Book List");
  }

  const bookIndex = userInfo.readingList.indexOf(id);
  if (bookIndex !== -1) {
    userInfo.readingList.splice(bookIndex, 1);
  }

  await User.findByIdAndUpdate(
    userId,
    {
      $push: { finishedReading: id },
    },
    {
      new: true,
    }
  );
};

const getFinishedReading = async (user: JwtPayload): Promise<string[]> => {
  const userInfo = await User.findById(user.userId).populate("finishedReading");

  if (!userInfo) {
    throw new Error("User not found");
  }

  return userInfo.finishedReading;
};

const removeFromFinishedReading = async (
  user: JwtPayload,
  id: string
): Promise<void> => {
  await User.findOneAndUpdate(
    {
      _id: user.userId,
    },
    {
      $pull: { finishedReading: id },
    },
    {
      new: true,
    }
  );
};

export const UserService = {
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
