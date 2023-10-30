import { JwtPayload } from "jsonwebtoken";
import {
  IBook,
  IBookFilter,
  IReview,
  bookSearchableFields,
} from "./book.interface";
import { Book } from "./book.model";

const createNewBook = async (payload: IBook): Promise<IBook | null> => {
  const result = await Book.create(payload);

  return result;
};

const getAllBooks = async (filters: IBookFilter): Promise<IBook[]> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: { $regex: value, $options: "i" },
      })),
    });
  }

  let query = Book.find();

  if (andConditions.length > 0) {
    query = query.and(andConditions);
  }

  const books = await query;

  if (!books) {
    throw new Error("Book Not found!");
  }

  return books;
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id });
  return result;
};

const updateBook = async (
  id: string,
  email: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate(
    { _id: id, authorEmail: email },
    payload,
    {
      new: true,
    }
  );

  return result;
};

const deleteBook = async (id: string, email: string): Promise<IBook | null> => {
  const result = await Book.findOneAndDelete({ _id: id, authorEmail: email });

  return result;
};

const addReview = async (
  id: string,
  user: JwtPayload,
  reviewData: string | { review: string }
): Promise<IBook> => {
  const book = await Book.findOne({ _id: id });

  if (!book) {
    throw new Error("No book found!");
  }

  const review =
    typeof reviewData === "string" ? reviewData : reviewData.review;

  const newReview: IReview = {
    review: review,
    reviewer: user.userId,
  };
  book.reviews!.push(newReview);

  const updatedBook = await book.save();
  return updatedBook;
};

const getReview = async (id: string): Promise<IReview[] | null> => {
  const book = await Book.findOne({ _id: id }).populate("reviews.reviewer");

  if (!book) {
    return null;
  }

  if (!book.reviews || book.reviews.length === 0) {
    return null;
  }

  const reviewsWithReviewerName: IReview[] = book.reviews.map(
    (review: any) => ({
      review: review.review,
      reviewer: review.reviewer ? { name: review.reviewer.name } : null,
    })
  );

  return reviewsWithReviewerName;
};

export const BookService = {
  createNewBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  addReview,
  getReview,
};
