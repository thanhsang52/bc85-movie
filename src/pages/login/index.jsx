import React, { use } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { userService } from "../../service/userService";
import { useDispatch, useSelector } from "react-redux";
import { setInfoUserAction } from "../../stores/user/index.js";
import { keysLocalStorage, localStorageUtil } from "../../util/localStorage";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "lottie-react";
import SuccessMotionAnimation from "../../assets/result-page-success-motion-design.json";
import LoaderCat from "../../assets/loader-cat.json";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { infoUser } = useSelector((state) => state.userSlice);
  // cách 1: không bị render giao diện
  // if (infoUser) {
  //   return <Navigate to="/" replace />; // Redirect to home if already logged in
  // }
  // cách 2: dùng useEffect để kiểm tra, có render giao diện
  // useEffect(() => {
  //   // If user is already logged in, redirect to home page
  //   if (infoUser) {
  //     navigate("/");
  //   }
  // }, [infoUser]);
  const onFinish = async (values) => {
    console.log("Success:", values);
    // Here you can call your login service
    try {
      const responseLogin = await userService.login(values);

      const data = responseLogin.data?.content;
      dispatch(setInfoUserAction(data));
      localStorageUtil.set(keysLocalStorage.INFO_USER, data);
      // đá user về trang chủ
      navigate("/");
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="bg-white p-8 rounded-2xl flex items-center">
      <div className="w-40">
        <Lottie animationData={LoaderCat} />
      </div>
      <div>
        <h3 className="text-2xl font-bold">Form login</h3>

        {/* form antd */}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="taiKhoan"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="matKhau"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* form antd */}
      </div>
    </div>
  );
};

export default LoginPage;
