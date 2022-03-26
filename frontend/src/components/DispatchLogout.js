import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const DispatchLogout = () => {
  console.log("dispatch component");
  const dispatch = useDispatch();
  dispatch(logout());
  return <></>;
};

export default DispatchLogout;
