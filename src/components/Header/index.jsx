import React from "react";
import NavBarDesktopTablet from "./NavBarDesktopTablet";
import NavBarMobile from "./NavBarMobile";
import { useMediaQuery } from "react-responsive";
import useResponsive from "../../hook/useResponsive";
export const HeaderPage = () => {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  return (
    <div className="px-6 py-2 bg-white flex justify-between">
      <img
        src="https://i.imgur.com/lC22izJ.png"
        width={60}
        height={60}
        alt="BC85 MOVIE"
      />

      <ul className="flex gap-5 text-lg justify-between items-center">
        <li className="hover:text-purple-400 cursor-pointer">Trang chủ</li>
        <li className="">|</li>
        <li className="hover:text-purple-400 cursor-pointer">Liên hệ</li>
        <li className="">|</li>
        <li className="hover:text-purple-400 cursor-pointer">Tin tức</li>
        <li className="">|</li>
        <li className="hover:text-purple-400 cursor-pointer">Ứng dụng</li>
      </ul>
      {isDesktop && <NavBarDesktopTablet />}
      {isTablet && <NavBarDesktopTablet />}
      {isMobile && <NavBarMobile />}
    </div>
  );
};
export default HeaderPage;
