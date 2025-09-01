import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const roleUser = {
  ADMIN: "QuanTri",
  USER: "KhachHang",
};
export const AuthCheck = ({ children, needLogin, pagePermission }) => {
  const { infoUser } = useSelector((state) => state.userSlice);
  const location = useLocation();
  // If user is logged in and is an admin, only redirect to admin if not already on admin pages
  if (
    infoUser?.maLoaiNguoiDung == roleUser.ADMIN &&
    infoUser &&
    !location.pathname.startsWith("/admin") &&
    !needLogin &&
    !pagePermission
  ) {
    return <Navigate to="/admin" replace />;
  }
  if (
    infoUser?.maLoaiNguoiDung == roleUser.USER &&
    pagePermission === roleUser.ADMIN
  ) {
    // If user is logged in and is a user, redirect to home page
    return <Navigate to="/" replace />;
  }
  // If user is logged in, redirect to home page
  if (infoUser && !needLogin) {
    return <Navigate to="/" replace />;
  }

  if (!infoUser && needLogin) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If user is not logged in, render the children components
  return <div>{children}</div>;
};
