import express from "express";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validations";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";

const router = express.Router();

router.patch("/:id", auth(), BookController.updateBook);

router.post(
  "/",
  validateRequest(BookValidation.createBookZodSchema),
  auth(),
  BookController.createBook
);

router.get("/review/:id", BookController.getReview);

router.post("/review/:id", auth(), BookController.addReview);

router.get("/:id", BookController.getSingleBook);

router.delete("/:id", auth(), BookController.deleteBook);

router.get("/", BookController.getAllBooks);

export const BookRoutes = router;
