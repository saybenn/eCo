import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  makeUserAuthor,
  makeUserAdmin,
  getUser,
  updateUser,
  updateUserShipping,
} from "../controllers/userController.js";
import { protect, admin } from "../middle/authMiddleware.js";

router.post("/login", authUser);
router.put("/shipping", protect, updateUserShipping);
router.route("/").post(registerUser).get(protect, admin, getAllUsers);
router
  .route("/profile")
  .put(protect, updateUserProfile)
  .get(protect, getUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUser)
  .put(protect, admin, updateUser);
router.put("/:id/author", protect, admin, makeUserAuthor);
router.put("/:id/admin", protect, admin, makeUserAdmin);

export default router;
