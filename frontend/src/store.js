import jwt from "jsonwebtoken";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  blogListReducer,
  blogCommentReducer,
  blogCommentDeleteReducer,
  blogPostDeleteReducer,
  blogLikeReducer,
  topBlogReducer,
  myBlogReducer,
  singleBlogReducer,
  blogCreateReducer,
} from "./reducers/blogReducers.js";
import {
  productListReducer,
  productDetailsReducer,
  topProductsReducer,
  productReviewReducer,
} from "./reducers/productReducers.js";
import {
  userRegisterReducer,
  userUpdateProfileReducer,
  userDetailsReducer,
  userLoginReducer,
} from "./reducers/userReducers.js";
import {
  cartAddReducer,
  cartGetReducer,
  cartControlReducer,
} from "./reducers/cartReducers.js";
import {
  orderListReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers.js";

const reducer = combineReducers({
  blogLike: blogLikeReducer,
  blogComment: blogCommentReducer,
  blogList: blogListReducer,
  blogCommentDelete: blogCommentDeleteReducer,
  blogDeletePost: blogPostDeleteReducer,
  myBlogs: myBlogReducer,
  topBlog: topBlogReducer,
  singleBlog: singleBlogReducer,
  createBlog: blogCreateReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  topProducts: topProductsReducer,
  productReview: productReviewReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  userLogin: userLoginReducer,
  cartAdd: cartAddReducer,
  cartGet: cartGetReducer,
  cartControl: cartControlReducer,
  orderList: orderListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const checkTokenExpirationMiddleware = () => (next) => (action) => {
  const token =
    JSON.parse(localStorage.getItem("userInfo")) &&
    JSON.parse(localStorage.getItem("userInfo"))["token"];
  console.log(token);
  if (token) {
    if (jwt.decode(token).exp < Date.now() / 1000) {
      localStorage.removeItem("userInfo");
      next(action);
    } else {
      next(action);
    }
  } else {
    next(action);
  }
};

const middleware = [thunk, checkTokenExpirationMiddleware];

const composeEnhance = composeWithDevTools({
  trace: true,
  traceLimit: 10,
});

const store = createStore(
  reducer,
  initialState,
  composeEnhance(applyMiddleware(...middleware))
);

export default store;
