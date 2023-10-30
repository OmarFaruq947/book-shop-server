import { z } from "zod";

// req validation
const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required",
    }),
    author: z.string({ required_error: "Author is required" }),
    authorEmail: z.string({ required_error: "Author Email is required" }),
    genre: z.string({
      required_error: "Genre is required",
    }),
    publicationDate: z.string({
      required_error: "Publication Date is required",
    }),
  }),
});

export const BookValidation = {
  createBookZodSchema,
};
