import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { userService } from "../../service/userService";

const schema = yup.object().shape({
  taiKhoan: yup
    .string()
    .max(10, "Tối đa 10 ký tự")
    .required("Tài khoản là bắt buộc"),
  matKhau: yup.string().required("Mật khẩu là bắt buộc"),
  hoTen: yup.string().required("Họ tên là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  soDT: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^\d+$/, "Số điện thoại chỉ chứa số"),
  maLoaiNguoiDung: yup.string().required("Mã loại người dùng là bắt buộc"),
});
const UserInfoPage = () => {
  //         {
  //     "taiKhoan": "bc85movie",
  //     "matKhau": "123456",
  //     "hoTen": "lam tran",
  //     "email": "bc85movie@gmail.com",
  //     "soDT": "0911111111",
  //     "maLoaiNguoiDung": "KhachHang",
  //   }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
    },
    //resolver: yupResolver(schema),
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const handleSubmitValueForm = async (dataForm) => {
    console.log("dataForm: ", dataForm);
    try {
      await userService.updateUserInfo({ ...dataForm, maNhom: "GP00" });
      alert("Cập nhật thông tin thành công");
    } catch (error) {
      console.log("error: ", error);
      // Handle 404 error specifically
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getUserInfo();
        //console.log("response: ", response);
        const { taiKhoan, matKhau, hoTen, email, soDT, maLoaiNguoiDung } =
          response.data.content;
        // Set default values for the form
        reset({
          taiKhoan,
          matKhau,
          hoTen,
          email,
          soDT,
          maLoaiNguoiDung,
        });
      } catch (error) {
        // Handle 404 error specifically
        if (error.response && error.response.status === 404) {
          console.log("Resource not found");
        } else {
          console.log("error: ", error);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <h3>Thông tin người dùng</h3>

      <div className="border-2 rounded-2xl shadow-2xl p-8">
        <form
          onSubmit={handleSubmit(handleSubmitValueForm)}
          className="space-y-3"
        >
          {/* Tài khoản */}
          <div>
            <p className="w-full">Tài khoản</p>
            <input
              {...register("taiKhoan")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.taiKhoan?.message}</p>
          </div>
          {/* Mật khẩu */}
          <div>
            <p className="w-full">Mật khẩu</p>
            <input
              {...register("matKhau")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.matKhau?.message}</p>
          </div>
          {/* Họ tên */}
          <div>
            <p className="w-full">Họ tên</p>
            <input
              {...register("hoTen")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.hoTen?.message}</p>
          </div>
          {/* Email */}
          <div>
            <p className="w-full">Email</p>
            <input
              {...register("email")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          {/* Số điện thoại */}
          <div>
            <p className="w-full">Số điện thoại</p>
            <input
              {...register("soDT")}
              className="border p-2 rounded-2xl"
              type="text"
            />
            <p className="text-red-500">{errors.soDT?.message}</p>
          </div>
          {/* Mã người dùng */}

          <div>
            <p className="w-full">Mã loại người dùng</p>
            <select
              {...register("maLoaiNguoiDung")}
              className="border p-2 rounded-2xl"
            >
              <option value="KhachHang">Khách hàng</option>
              <option value="QuanTri">Quản trị</option>
            </select>
            <p className="text-red-500">{errors.maLoaiNguoiDung?.message}</p>
          </div>

          <button className="mt-3 bg-purple-400 p-2 rounded text-white">
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoPage;
