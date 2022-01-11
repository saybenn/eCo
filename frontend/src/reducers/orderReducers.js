import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_MY_ORDERS_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_RESET,
  PAY_ORDER_SUCCESS,
  DELIVER_ORDER_FAIL,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_RESET,
  DELIVER_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_MY_ORDERS_REQUEST:
      return { loading: true };
    case GET_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case GET_MY_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true, success: false };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_REQUEST:
      return { loading: true };
    case PAY_ORDER_SUCCESS:
      return { loading: false, success: true };
    case PAY_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case PAY_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case DELIVER_ORDER_REQUEST:
      return { loading: true };
    case DELIVER_ORDER_SUCCESS:
      return { loading: false, success: true };
    case DELIVER_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case DELIVER_ORDER_RESET:
      return {};
    default:
      return state;
  }
};
