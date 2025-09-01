import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Header, Content } from "antd/es/layout/layout";
import { Layout, Menu, theme, Dropdown, Avatar } from "antd";
import { setLogoutAction } from "../../stores/user";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  CrownOutlined,
} from "@ant-design/icons";

export const NavBarDesktopTablet = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice);
  const infoUser = user.infoUser;
  //   console.log("user", user);
  const navigate = useNavigate();
  const handleLogout = () => {
    // console.log("handleLogout");
    // Dispatch the logout action
    dispatch(setLogoutAction());
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // Determine menu items based on user role
  const menuItems = [
    {
      key: "profile",
      icon: <SettingOutlined />, // Changed from UserOutlined to SettingOutlined for "Profile"
      label: "Profile",
      onClick: () => {
        navigate("/info");
      },
    },
    // Only show "Administrator" if user has role "QuanTri"
    ...(infoUser?.maLoaiNguoiDung === "QuanTri"
      ? [
          {
            key: "admin",
            icon: <CrownOutlined />, // Changed from UserOutlined to CrownOutlined for "Administrator"
            label: "Administrator",
            onClick: () => {
              navigate("/admin");
            },
          },
        ]
      : []),
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  // Nếu chưa login (không có infoUser), chỉ hiện link Register và Login
  if (!infoUser) {
    return (
      <Header
        style={{
          padding: "0 24px",
          background: colorBgContainer,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <span
          style={{ marginRight: 16, cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
          Login
        </span>
      </Header>
    );
  }

  // Nếu đã login, hiện menu user như cũ
  return (
    <>
      <Header
        style={{
          padding: "0 24px",
          background: colorBgContainer,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <span className="mr-2">Welcome back, {infoUser?.hoTen}</span>
        <Dropdown
          menu={{
            items: menuItems,
          }}
          placement="bottomRight"
        >
          <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} />
        </Dropdown>
      </Header>
    </>
  );
};
export default NavBarDesktopTablet;
