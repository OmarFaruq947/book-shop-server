import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidaion } from "./user.validations";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/my-profile", auth(), UserController.getMyProfile);

router.patch(
  "/:id",
  auth(),
  validateRequest(UserValidaion.updateUserZodSchema),
  UserController.updateUser
);

router.post("/addToWishlist/:id", auth(), UserController.addToWishlist);
router.post("/addToReadingList/:id", auth(), UserController.addToReadingList);
router.post(
  "/addToFinishedReading/:id",
  auth(),
  UserController.addToFinishedReading
);

router.post(
  "/removeFromWishlist/:id",
  auth(),
  UserController.removeFromWishlist
);

router.post(
  "/removeFromReadingList/:id",
  auth(),
  UserController.removeFromReadingList
);

router.post(
  "/removeFromFinishedReading/:id",
  auth(),
  UserController.removeFromFinishedReading
);

router.get("/wishlist", auth(), UserController.getWishlist);
router.get("/readingList", auth(), UserController.getReadingList);
router.get("/finishedReading", auth(), UserController.getFinishedReading);

router.delete("/:id", auth(), UserController.deleteAUser);

router.get("/", auth(), UserController.getAllUsers);

router.get("/:id", auth(), UserController.getSingleUser);

export const userRoutes = router;
