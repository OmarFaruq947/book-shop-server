import { Request, Response } from "express";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constant";
import { IBook, IReview } from "./book.interface";
import { BookService } from "./book.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.createNewBook(bookData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books Created successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const result = await BookService.getAllBooks(filters);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const email = req.user?.email;
  const updatedData = req.body;

  const result = await BookService.updateBook(id, email, updatedData);
  if (!result) {
    return res
      .status(403)
      .json({ message: "Access denied. You are not the author of this book." });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const email = req.user?.email;

  const result = await BookService.deleteBook(id, email);

  if (!result) {
    return res
      .status(403)
      .json({ message: "Access denied. You are not the author of this book." });
  }

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book deleted successfully",
    data: result,
  });
});

const addReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  const reviewData = req.body;
  const result = await BookService.addReview(id, user, reviewData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Add Review successfully",
    data: result,
  });
});

const getReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getReview(id);

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review retrieved successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  addReview,
  getReview,
};
