import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

//@desc Create Order
//@route POST /api/orders
//@access User
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const user = await User.findById(req.user._id);
  console.log(user);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    user.cartItems = null;
    await user.save();

    res.status(201).json(createdOrder);
  }
});

//@desc Get Order by id
//@route GET /api/orders/:id
//@access User
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc Get own orders
//@route GET /api/orders/profile
//@access User
const getOwnOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("Order(s) not found.");
  }
});

//@desc Get all orders
//@route GET /api/orders
//@access Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Order.count({});
  const orders = await Order.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (orders) {
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

//@desc Update Order to Paid
//@route PUT /api/orders/:id/pay
//@access User
const updateOrderPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc Set order to delivered
//@route PUT /api/orders/:id/deliver
//@access Admin
const updateOrderDelivered = asyncHandler(async (req, res) => {
  console.log(req.body);
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  createOrder,
  updateOrderPaid,
  updateOrderDelivered,
  getAllOrders,
  getOrderById,
  getOwnOrders,
};
