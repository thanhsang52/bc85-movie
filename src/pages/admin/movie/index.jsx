import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Switch, Upload, message, Popconfirm, Rate } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { movieService } from "../../../service/movieService";

const MovieAdminPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [form] = Form.useForm();

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await movieService.getListMovies();
      setMovies(response.data.content);
    } catch (error) {
      message.error('Không thể tải danh sách phim');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAdd = () => {
    setEditingMovie(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    form.setFieldsValue({
      ...movie,
      ngayKhoiChieu: movie.ngayKhoiChieu?.split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (movieId) => {
    try {
      await movieService.deleteMovie(movieId);
      message.success('Xóa phim thành công');
      fetchMovies();
    } catch (error) {
      message.error('Xóa phim thất bại');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const movieData = {
        ...values,
        maNhom: 'GP01'
      };

      if (editingMovie) {
        await movieService.updateMovie({ ...movieData, maPhim: editingMovie.maPhim });
        message.success('Cập nhật phim thành công');
      } else {
        await movieService.addMovie(movieData);
        message.success('Thêm phim thành công');
      }
      
      setIsModalOpen(false);
      fetchMovies();
    } catch (error) {
      message.error(editingMovie ? 'Cập nhật phim thất bại' : 'Thêm phim thất bại');
    }
  };

  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
      width: 80,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      width: 100,
      render: (url) => <img src={url} alt="poster" className="w-16 h-20 object-cover" />
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
      width: 200,
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: 300,
      render: (text) => text?.length > 100 ? text.substring(0, 100) + '...' : text
    },
    {
      title: 'Đánh giá',
      dataIndex: 'danhGia',
      key: 'danhGia',
      width: 120,
      render: (rating) => <Rate disabled value={rating / 2} allowHalf />
    },
    {
      title: 'Ngày khởi chiếu',
      dataIndex: 'ngayKhoiChieu',
      key: 'ngayKhoiChieu',
      width: 120,
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 150,
      render: (_, record) => (
        <div className="space-y-1">
          {record.hot && <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">HOT</span>}
          {record.dangChieu && <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Đang chiếu</span>}
          {record.sapChieu && <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Sắp chiếu</span>}
        </div>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <div className="space-x-2">
          <Button 
            type="primary" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa phim này?"
            onConfirm={() => handleDelete(record.maPhim)}
          >
            <Button 
              type="primary" 
              danger 
              size="small" 
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý phim</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Thêm phim
        </Button>
      </div>

      <Table 
        columns={columns}
        dataSource={movies}
        rowKey="maPhim"
        loading={loading}
        scroll={{ x: 1200 }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingMovie ? 'Sửa phim' : 'Thêm phim'}
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
            label="Tên phim"
            name="tenPhim"
            rules={[{ required: true, message: 'Vui lòng nhập tên phim!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Trailer"
            name="trailer"
            rules={[{ required: true, message: 'Vui lòng nhập link trailer!' }]}
          >
            <Input placeholder="https://www.youtube.com/watch?v=..." />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="hinhAnh"
            rules={[{ required: true, message: 'Vui lòng nhập link hình ảnh!' }]}
          >
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="moTa"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Ngày khởi chiếu"
            name="ngayKhoiChieu"
            rules={[{ required: true, message: 'Vui lòng chọn ngày khởi chiếu!' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="Đánh giá (1-10)"
            name="danhGia"
            rules={[{ required: true, message: 'Vui lòng nhập đánh giá!' }]}
          >
            <Input type="number" min={1} max={10} />
          </Form.Item>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              label="Hot"
              name="hot"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Đang chiếu"
              name="dangChieu"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label="Sắp chiếu"
              name="sapChieu"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <Form.Item className="mb-0 text-right">
            <Button onClick={() => setIsModalOpen(false)} className="mr-2">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              {editingMovie ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MovieAdminPage;
