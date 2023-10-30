"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
// req validation
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "title is required",
        }),
        author: zod_1.z.string({ required_error: "Author is required" }),
        authorEmail: zod_1.z.string({ required_error: "Author Email is required" }),
        genre: zod_1.z.string({
            required_error: "Genre is required",
        }),
        publicationDate: zod_1.z.string({
            required_error: "Publication Date is required",
        }),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
};
