import React, { useEffect, useState } from 'react';
import { Form, Select, DatePicker, TimePicker, Button, message, Card, Table } from 'antd';
import { movieService } from '../../../service/movieService';
import { theaterService } from '../../../service/theaterService';
import dayjs from 'dayjs';

const { Option } = Select;

const ScheduleAdminPage = () => {
  const [form] = Form.useForm();
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await movieService.getListMovies();
      setMovies(response.data.content);
    } catch (error) {
      message.error('Không thể tải danh sách phim');
    }
  };

  const fetchTheaters = async () => {
    try {
      const response = await theaterService.getListTheaters();
      setTheaters(response.data.content);
    } catch (error) {
      message.error('Không thể tải danh sách hệ thống rạp');
    }
  };

  const fetchCinemas = async (maHeThongRap) => {
    try {
      const response = await theaterService.getCinemasByTheater(maHeThongRap);
      setCinemas(response.data.content);
    } catch (error) {
      message.error('Không thể tải danh sách cụm rạp');
    }
  };

  const fetchSchedules = async () => {
    try {
      // Fetch schedules for all theaters and combine
      const allSchedules = [];
      for (const theater of theaters) {
        const response = await theaterService.getListSchedules(theater.maHeThongRap);
        const theaterSchedules = response.data.content.flatMap(t => 
          t.lstCumRap.flatMap(cumRap => 
            cumRap.danhSachPhim.flatMap(phim => 
              phim.lstLichChieuTheoPhim.map(lichChieu => ({
                ...lichChieu,
                tenPhim: phim.tenPhim,
                tenCumRap: cumRap.tenCumRap,
                tenHeThongRap: theater.tenHeThongRap
              }))
            )
          )
        );
        allSchedules.push(...theaterSchedules);
      }
      setSchedules(allSchedules);
    } catch (error) {
      message.error('Không thể tải lịch chiếu');
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchTheaters();
  }, []);

  useEffect(() => {
    if (theaters.length > 0) {
      fetchSchedules();
    }
  }, [theaters]);

  const handleTheaterChange = (maHeThongRap) => {
    fetchCinemas(maHeThongRap);
    form.setFieldsValue({ maRap: undefined });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const scheduleData = {
        maPhim: values.maPhim,
        ngayChieuGioChieu: values.ngayChieu.format('DD/MM/YYYY') + ' ' + values.gioChieu.format('HH:mm:ss'),
        maRap: values.maRap,
        giaVe: values.giaVe
      };

      await theaterService.createSchedule(scheduleData);
      message.success('Tạo lịch chiếu thành công!');
      form.resetFields();
      fetchSchedules();
    } catch (error) {
      message.error('Tạo lịch chiếu thất bại: ' + (error.response?.data?.content || 'Vui lòng thử lại'));
    } finally {
      setLoading(false);
    }
  };

  const scheduleColumns = [
    {
      title: 'Mã lịch chiếu',
      dataIndex: 'maLichChieu',
      key: 'maLichChieu',
      width: 120,
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
      width: 200,
    },
    {
      title: 'Hệ thống rạp',
      dataIndex: 'tenHeThongRap',
      key: 'tenHeThongRap',
      width: 150,
    },
    {
      title: 'Cụm rạp',
      dataIndex: 'tenCumRap',
      key: 'tenCumRap',
      width: 200,
    },
    {
      title: 'Rạp',
      dataIndex: 'tenRap',
      key: 'tenRap',
      width: 100,
    },
    {
      title: 'Ngày chiếu',
      dataIndex: 'ngayChieuGioChieu',
      key: 'ngayChieuGioChieu',
      width: 150,
      render: (datetime) => new Date(datetime).toLocaleString('vi-VN')
    },
    {
      title: 'Giá vé',
      dataIndex: 'giaVe',
      key: 'giaVe',
      width: 100,
      render: (price) => price?.toLocaleString() + 'đ'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý lịch chiếu</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form tạo lịch chiếu */}
        <Card title="Tạo lịch chiếu mới" className="h-fit">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Phim"
              name="maPhim"
              rules={[{ required: true, message: 'Vui lòng chọn phim!' }]}
            >
              <Select placeholder="Chọn phim">
                {movies.map(movie => (
                  <Option key={movie.maPhim} value={movie.maPhim}>
                    {movie.tenPhim}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Hệ thống rạp"
              name="maHeThongRap"
              rules={[{ required: true, message: 'Vui lòng chọn hệ thống rạp!' }]}
            >
              <Select 
                placeholder="Chọn hệ thống rạp"
                onChange={handleTheaterChange}
              >
                {theaters.map(theater => (
                  <Option key={theater.maHeThongRap} value={theater.maHeThongRap}>
                    {theater.tenHeThongRap}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Cụm rạp"
              name="maRap"
              rules={[{ required: true, message: 'Vui lòng chọn cụm rạp!' }]}
            >
              <Select placeholder="Chọn cụm rạp">
                {cinemas.map(cinema => (
                  <Option key={cinema.maCumRap} value={cinema.maCumRap}>
                    {cinema.tenCumRap}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Ngày chiếu"
              name="ngayChieu"
              rules={[{ required: true, message: 'Vui lòng chọn ngày chiếu!' }]}
            >
              <DatePicker 
                className="w-full"
                format="DD/MM/YYYY"
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>

            <Form.Item
              label="Giờ chiếu"
              name="gioChieu"
              rules={[{ required: true, message: 'Vui lòng chọn giờ chiếu!' }]}
            >
              <TimePicker 
                className="w-full"
                format="HH:mm"
              />
            </Form.Item>

            <Form.Item
              label="Giá vé"
              name="giaVe"
              rules={[{ required: true, message: 'Vui lòng nhập giá vé!' }]}
            >
              <Select placeholder="Chọn giá vé">
                <Option value={75000}>75,000đ</Option>
                <Option value={85000}>85,000đ</Option>
                <Option value={95000}>95,000đ</Option>
                <Option value={120000}>120,000đ</Option>
                <Option value={150000}>150,000đ</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="w-full"
              >
                Tạo lịch chiếu
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Danh sách lịch chiếu */}
        <Card title="Danh sách lịch chiếu" className="h-fit">
          <Table
            columns={scheduleColumns}
            dataSource={schedules}
            rowKey="maLichChieu"
            scroll={{ x: 800, y: 400 }}
            pagination={{ pageSize: 5 }}
            size="small"
          />
        </Card>
      </div>
    </div>
  );
};

export default ScheduleAdminPage;