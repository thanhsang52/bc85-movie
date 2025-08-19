import { get } from "react-hook-form";
import { axiosCustom } from "./config";
export const userService = {
  getListUsers: () => {
    return axiosCustom.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
  },
  login: (payload) => {
    return axiosCustom.post("/QuanLyNguoiDung/DangNhap", payload);
  },
  register: (payload) => {
    return axiosCustom.post("/QuanLyNguoiDung/DangKy", payload);
  },
  getUserInfo: () => {
    return axiosCustom.post(`/QuanLyNguoiDung/ThongTinTaiKhoan`);
  },
  updateUserInfo: (payload) => {
    return axiosCustom.put(
      `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      payload
    );
  },
  deleteUser: (taiKhoan) => {
    return axiosCustom.delete(
      `/QuanLyNguoiDung/XoaNguoiDung?taiKhoan=${taiKhoan}`
    );
  },
};
