import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLogoutAction } from "../../stores/user";

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
  return (
    <div className="text-white items-center flex">
      {infoUser ? (
        <div>
          <a onClick={navigate("/info")}>{infoUser?.hoTen}</a>
          <button
            onClick={handleLogout}
            className="ml-2 px-2 py-1 rounded bg-purple-400"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => navigate("/register")}
            className="mr-2 px-2 py-1 rounded bg-white text-black"
          >
            Đăng ký
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="px-2 py-1 rounded  text-black"
          >
            Đăng nhập
          </button>
        </div>
      )}
    </div>
  );
};
export default NavBarDesktopTablet;
