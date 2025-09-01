import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { userService } from '../../../service/userService';

const { Option } = Select;
const { Search } = Input;

const UserAdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getListUsers();
      setUsers(response.data.content);
    } catch (error) {
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      fetchUsers();
      return;
    }
    
    setLoading(true);
    try {
      const response = await userService.searchUser(keyword);
      setUsers(response.data.content);
    } catch (error) {
      message.error('Tìm kiếm thất bại');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (taiKhoan) => {
    try {
      await userService.deleteUser(taiKhoan);
      message.success('Xóa người dùng thành công');
      fetchUsers();
    } catch (error) {
      message.error('Xóa người dùng thất bại');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const userData = {
        ...values,
        maNhom: 'GP01'
      };

      if (editingUser) {
        await userService.updateUserInfo(userData);
        message.success('Cập nhật người dùng thành công');
      } else {
        await userService.addUser(userData);
        message.success('Thêm người dùng thành công');
      }
      
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      message.error(editingUser ? 'Cập nhật người dùng thất bại' : 'Thêm người dùng thất bại');
    }
  };

  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      width: 120,
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      key: 'soDt',
      width: 120,
    },
    {
      title: 'Loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      width: 130,
      render: (type) => (
        <span className={`px-2 py-1 rounded text-xs ${
          type === 'QuanTri' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {type === 'QuanTri' ? 'Quản trị' : 'Khách hàng'}
        </span>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.taiKhoan)}
          >
            <Button 
              type="primary" 
              danger 
              size="small" 
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Thêm người dùng
        </Button>
      </div>

      <div className="mb-4">
        <Search
          placeholder="Tìm kiếm theo tài khoản, họ tên..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          style={{ width: 400 }}
        />
      </div>

      <Table 
        columns={columns}
        dataSource={users}
        rowKey="taiKhoan"
        loading={loading}
        scroll={{ x: 800 }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingUser ? 'Sửa người dùng' : 'Thêm người dùng'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Tài khoản"
            name="taiKhoan"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
          >
            <Input disabled={!!editingUser} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[
              { required: !editingUser, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
            ]}
          >
            <Input.Password placeholder={editingUser ? "Để trống nếu không đổi mật khẩu" : ""} />
          </Form.Item>

          <Form.Item
            label="Họ tên"
            name="hoTen"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="soDt"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại phải có 10-11 chữ số!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Loại người dùng"
            name="maLoaiNguoiDung"
            rules={[{ required: true, message: 'Vui lòng chọn loại người dùng!' }]}
          >
            <Select>
              <Option value="KhachHang">Khách hàng</Option>
              <Option value="QuanTri">Quản trị</Option>
            </Select>
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Button onClick={() => setIsModalOpen(false)} className="mr-2">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              {editingUser ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserAdminPage;