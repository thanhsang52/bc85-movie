import { useSelector, useDispatch } from "react-redux";
import { UserOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Dropdown, Avatar } from "antd";
import { setLogoutAction } from "../../stores/user";
import { Header, Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";

const NavBarAdmin = () => {
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
            items: [
              {
                key: "profile",
                icon: <UserOutlined />,
                label: "Profile",
              },
              {
                key: "homepage",
                icon: <HomeOutlined />,
                label: "Home",
                onClick: () => {
                  navigate("/");
                },
              },
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "Logout",
                onClick: handleLogout,
              },
            ],
          }}
          placement="bottomRight"
        >
          <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} />
        </Dropdown>
      </Header>
    </>
  );
};

export default NavBarAdmin;
