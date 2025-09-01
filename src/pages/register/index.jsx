import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { userService } from "../../service/userService";

const { Option } = Select;

export const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const registerData = {
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau,
        email: values.email,
        soDt: values.soDt,
        maNhom: "GP01",
        hoTen: values.hoTen
      };
      
      await userService.register(registerData);
      message.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      message.error("Đăng ký thất bại: " + (error.response?.data?.content || "Vui lòng thử lại"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng ký tài khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoặc{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              đăng nhập nếu đã có tài khoản
            </a>
          </p>
        </div>
        
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="mt-8 space-y-6"
        >
          <Form.Item
            label="Họ tên"
            name="hoTen"
            rules={[
              { required: true, message: 'Vui lòng nhập họ tên!' },
              { min: 2, message: 'Họ tên phải có ít nhất 2 ký tự!' }
            ]}
          >
            <Input size="large" placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            label="Tài khoản"
            name="taiKhoan"
            rules={[
              { required: true, message: 'Vui lòng nhập tài khoản!' },
              { min: 3, message: 'Tài khoản phải có ít nhất 3 ký tự!' }
            ]}
          >
            <Input size="large" placeholder="Nhập tài khoản" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
            ]}
          >
            <Input.Password size="large" placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={['matKhau']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('matKhau') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Xác nhận mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input size="large" placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="soDt"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại phải có 10-11 chữ số!' }
            ]}
          >
            <Input size="large" placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              className="w-full"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default RegisterPage;
