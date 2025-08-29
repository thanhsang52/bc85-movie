import { useState } from "react";
import {
  UserOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Dropdown, Avatar } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Header, Content } from "antd/es/layout/layout";
import NavBarAdmin from "../components/Header/NavBarAdmin";
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<NavLink to="/admin">Users</NavLink>, "/admin", <UserOutlined />),
  getItem(
    <NavLink to="/admin/movie">Films</NavLink>,
    "/admin/movie",
    <VideoCameraOutlined />
  ),
  getItem(
    <NavLink to="">Showtime</NavLink>,
    "/admin/movie",
    <DesktopOutlined />
  ),
];

const AdminTemplate = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  console.log("location: ", location.pathname);
  // /admin/movie
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          // defaultSelectedKeys={["1"]}
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <NavBarAdmin />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
