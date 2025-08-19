import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogoutAction } from "../../stores/user";

export const NavBarMobile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice);
  const infoUser = user.infoUser;
  const navigate = useNavigate();
  const handleLogout = () => {
    // console.log("handleLogout");
    // Dispatch the logout action
    dispatch(setLogoutAction());
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <img
        onClick={showDrawer}
        width={30}
        height={30}
        src="https://img.icons8.com/?size=100&id=0mAtpPoNoAEd&format=png&color=000000"
        alt="Menu Icon"
      />

      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        placement="left"
        width={200}
      >
        {infoUser ? (
          <div className="text-white">
            <span className="text-black" onClick={navigate("/info")}>
              {infoUser?.hoTen}
            </span>
            <br />
            <button
              onClick={handleLogout}
              className="ml-2 px-2 py-1 rounded bg-purple-400"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-white">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="px-2 py-1 rounded bg-purple-400"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => navigate("/register")}
              className="ml-2 px-2 py-1 rounded bg-white text-black"
            >
              Đăng ký
            </button>
          </div>
        )}
      </Drawer>
    </>
  );
};
export default NavBarMobile;
