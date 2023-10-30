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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id });
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteAUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndDelete({ _id: id });
    return result;
});
const getMyProfile = (userId, email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById({ _id: userId, authorEmail: email });
    return result;
});
const addToWishlist = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const userInfo = yield user_model_1.User.findById(userId);
    if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.wishlist.includes(id)) {
        throw new Error("Book already exists in the wishlist");
    }
    yield user_model_1.User.findByIdAndUpdate(userId, {
        $push: { wishlist: id },
    }, {
        new: true,
    });
});
const getWishlist = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield user_model_1.User.findById(user.userId).populate("wishlist");
    if (!userInfo) {
        throw new Error("User not found");
    }
    return userInfo.wishlist;
});
const removeFromWishlist = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.findOneAndUpdate({
        _id: user.userId,
    }, {
        $pull: { wishlist: id },
    }, {
        new: true,
    });
});
const addToReadingList = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const userInfo = yield user_model_1.User.findById(userId);
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
    yield user_model_1.User.findByIdAndUpdate(userId, {
        $push: { readingList: id },
    }, {
        new: true,
    });
});
const getReadingList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield user_model_1.User.findById(user.userId).populate("readingList");
    if (!userInfo) {
        throw new Error("User not found");
    }
    return userInfo.readingList;
});
const removeFromReadingList = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.findOneAndUpdate({
        _id: user.userId,
    }, {
        $pull: { readingList: id },
    }, {
        new: true,
    });
});
const addToFinishedReading = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const userInfo = yield user_model_1.User.findById(userId);
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
    yield user_model_1.User.findByIdAndUpdate(userId, {
        $push: { finishedReading: id },
    }, {
        new: true,
    });
});
const getFinishedReading = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield user_model_1.User.findById(user.userId).populate("finishedReading");
    if (!userInfo) {
        throw new Error("User not found");
    }
    return userInfo.finishedReading;
});
const removeFromFinishedReading = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.findOneAndUpdate({
        _id: user.userId,
    }, {
        $pull: { finishedReading: id },
    }, {
        new: true,
    });
});
exports.UserService = {
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
