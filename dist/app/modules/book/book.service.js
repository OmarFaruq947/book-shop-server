"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_interface_1 = require("./book.interface");
const book_model_1 = require("./book.model");
const createNewBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(payload);
    return result;
});
const getAllBooks = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_interface_1.bookSearchableFields.map((field) => ({
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
    let query = book_model_1.Book.find();
    if (andConditions.length > 0) {
        query = query.and(andConditions);
    }
    const books = yield query;
    if (!books) {
        throw new Error("Book Not found!");
    }
    return books;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOne({ _id: id });
    return result;
});
const updateBook = (id, email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id, authorEmail: email }, payload, {
        new: true,
    });
    return result;
});
const deleteBook = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndDelete({ _id: id, authorEmail: email });
    return result;
});
const addReview = (id, user, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findOne({ _id: id });
    if (!book) {
        throw new Error("No book found!");
    }
    const review = typeof reviewData === "string" ? reviewData : reviewData.review;
    const newReview = {
        review: review,
        reviewer: user.userId,
    };
    book.reviews.push(newReview);
    const updatedBook = yield book.save();
    return updatedBook;
});
const getReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findOne({ _id: id }).populate("reviews.reviewer");
    if (!book) {
        return null;
    }
    if (!book.reviews || book.reviews.length === 0) {
        return null;
    }
    const reviewsWithReviewerName = book.reviews.map((review) => ({
        review: review.review,
        reviewer: review.reviewer ? { name: review.reviewer.name } : null,
    }));
    return reviewsWithReviewerName;
});
exports.BookService = {
    createNewBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    addReview,
    getReview,
};
