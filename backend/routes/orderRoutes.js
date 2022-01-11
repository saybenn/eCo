import express from "express";
const router = express.Router();
import {
  createOrder,
  updateOrderPaid,
  updateOrderDelivered,
  getAllOrders,
  getOrderById,
  getOwnOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middle/authMiddleware.js";

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.get("/profile", protect, getOwnOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/deliver", protect, admin, updateOrderDelivered);
router.put("/:id/pay", protect, updateOrderPaid);
export default router;
