import React from "react";
import { userService } from "../../../service/userService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Space, Table, Tag } from "antd";

export const AdminHomePage = () => {
  const qc = useQueryClient();
  // useMutation is used for creating, updating, or deleting data
  const { mutate } = useMutation({
    mutationFn: async (taiKhoan) => await userService.deleteUser(taiKhoan),
    onSuccess: () => {
      // Invalidate and refetch the users list query after successful deletion
      qc.invalidateQueries(["listUser"]);
      // Handle success, e.g., show a success message or update the state
      alert("Xoá user thành công");
      console.log("User deleted successfully");
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.error("Error deleting user:", error);
    },
  });
  // useQuery is used for fetching data
  // Fetch the list of users using react-query
  // This will automatically handle caching, background updates, and more
  const { data, error } = useQuery({
    queryKey: ["listUser"],
    queryFn: async () => await userService.getListUsers(),
  });
  const listUser = data?.data?.content || [];
  console.log("listUser: ", listUser);
  if (error) {
    console.error("Error fetching user list:", error);
    return <div>Error loading user list</div>;
  }

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Mã Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "soDT",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          {/* <button className="bg-blue-500 p-2 rounded text-white">Xem</button> */}
          <button
            onClick={() => {
              //console.log("record", record.taiKhoan);
              mutate(record.taiKhoan);
            }}
            className="bg-red-500 p-2 rounded text-white"
          >
            Xoá
          </button>
          <button className="bg-purple-400 p-2 rounded text-white">Sửa</button>
        </div>
      ),
    },
  ];

  const dataColumns = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <div className="px-10">
      <h3 className="h3">Danh sách user</h3>

      <Table columns={columns} dataSource={listUser} />
    </div>
  );
};
export default AdminHomePage;
