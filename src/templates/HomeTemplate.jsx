import React from "react";
import { Outlet } from "react-router-dom";
import HeaderPage from "../components/Header";
import FooterPage from "../components/Footer";

export const HomeTemplate = () => {
  return (
    <div>
      <HeaderPage />
      <Outlet />
      <FooterPage />
    </div>
  );
};
export default HomeTemplate;
