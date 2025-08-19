import React from "react";
import { Outlet } from "react-router-dom";
import HeaderPage from "../components/Header";

export const HomeTemplate = () => {
  return (
    <div>
      <HeaderPage />
      <Outlet />
    </div>
  );
};
export default HomeTemplate;
