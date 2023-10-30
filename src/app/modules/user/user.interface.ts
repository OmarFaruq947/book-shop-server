import { Model, ObjectId } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  _id: ObjectId;
  name: UserName;
  password: string;
  email: string;
  wishlist: string[];
  readingList: string[];
  finishedReading: string[];
};

export type UserModel = Model<IUser> & {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, "_id" | "email" | "password"> | null>;
  isUserExistById(userId: string): Promise<Pick<IUser, "_id" | "email"> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};
