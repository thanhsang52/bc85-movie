import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieService } from "../../service/movieService";
import { theaterService } from "../../service/theaterService";
import { Rate, Collapse, Button, Modal } from "antd";

export const MovieDetailPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieDetail, setMovieDetail] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("all");

  const fetchMovieDetail = async () => {
    try {
      const response = await movieService.getMovieDetail(movieId);
      setMovieDetail(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTheaters = async () => {
    try {
      const response = await theaterService.getListTheaters();
      setTheaters(response.data.content);
      if (response.data.content.length > 0) {
        setSelectedTheater(response.data.content[0].maHeThongRap);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSchedules = async (theaterId) => {
    try {
      const response = await theaterService.getListSchedules(theaterId);
      setSchedules(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchTheaters();
  }, [movieId]);

  useEffect(() => {
    if (selectedTheater) {
      fetchSchedules(selectedTheater);
    }
  }, [selectedTheater]);

  if (!movieDetail) return <div>Loading...</div>;

  const movieSchedules = schedules.flatMap((theater) =>
    theater.lstCumRap.flatMap((cumRap) =>
      cumRap.danhSachPhim
        .filter((phim) => phim.maPhim == movieId)
        .map((phim) => ({ ...cumRap, danhSachPhim: [phim] }))
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Thông tin phim */}
      <div className="flex gap-8 mb-8 bg-black p-8 rounded-lg relative overflow-hidden">
        {/* Stars background */}
        <div className="absolute inset-0">
          {/* Large stars */}
          <div className="absolute top-8 left-12 w-2 h-2 bg-white rounded-full animate-pulse shadow-white shadow-sm"></div>
          <div
            className="absolute top-16 right-24 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-24 left-16 w-2 h-2 bg-blue-200 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-12 right-12 w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>

          {/* Medium stars */}
          <div
            className="absolute top-20 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-100 rounded-full animate-pulse"
            style={{ animationDelay: "2.5s" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-blue-100 rounded-full animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>

          {/* Small stars */}
          <div
            className="absolute top-12 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="absolute top-32 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "0.8s" }}
          ></div>
          <div
            className="absolute bottom-16 left-2/3 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "1.2s" }}
          ></div>
          <div
            className="absolute bottom-32 right-1/2 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "1.8s" }}
          ></div>
          <div
            className="absolute top-1/4 left-3/4 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "2.2s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-3/4 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "2.8s" }}
          ></div>

          {/* Tiny stars */}
          <div
            className="absolute top-6 right-1/6 w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="absolute top-28 left-5/6 w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "0.9s" }}
          ></div>
          <div
            className="absolute bottom-6 left-1/6 w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "1.3s" }}
          ></div>
          <div
            className="absolute bottom-28 right-5/6 w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "1.9s" }}
          ></div>
        </div>
        <img
          src={movieDetail.hinhAnh}
          alt={movieDetail.tenPhim}
          className="w-80 h-96 object-cover rounded border-8 border-white shadow-2xl relative z-10"
        />
        <div className="flex-1 relative z-10">
          <h1 className="text-3xl font-bold mb-4 text-white">
            {movieDetail.tenPhim}
          </h1>
          <div className="mb-4">
            <Rate disabled value={movieDetail.danhGia / 2} allowHalf />
            <span className="ml-2 text-gray-300">
              ({movieDetail.danhGia}/10)
            </span>
          </div>
          <div className="space-y-2 text-gray-200">
            <p>
              <strong>Mô tả:</strong> {movieDetail.moTa}
            </p>
            <p>
              <strong>Ngày khởi chiếu:</strong>{" "}
              {new Date(movieDetail.ngayKhoiChieu).toLocaleDateString("vi-VN")}
            </p>
            <div className="flex gap-2 mt-4">
              {movieDetail.hot && (
                <span className="bg-red-500 text-white px-3 py-1 rounded">
                  🔥 HOT
                </span>
              )}
              {movieDetail.dangChieu && (
                <span className="bg-green-500 text-white px-3 py-1 rounded">
                  ▶️ Đang chiếu
                </span>
              )}
              {movieDetail.sapChieu && (
                <span className="bg-blue-500 text-white px-3 py-1 rounded">
                  ⏰ Sắp chiếu
                </span>
              )}
            </div>
            <div className="flex gap-4 mt-6">
              <Button
                type="primary"
                size="large"
                onClick={() => setIsTrailerModalOpen(true)}
              >
                🎥 Xem Trailer
              </Button>
              <Button
                type="default"
                size="large"
                className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
              >
                🎫 Mua vé ngay
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Lịch chiếu */}
      <div className="flex gap-8">
        {/* Cột trái - Danh sách hệ thống rạp */}
        <div className="w-1/3">
          <h3 className="text-xl font-semibold mb-4">Hệ thống rạp</h3>
          <div className="space-y-2">
            {theaters.map((theater) => (
              <div
                key={theater.maHeThongRap}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${
                  selectedTheater === theater.maHeThongRap
                    ? "bg-blue-100 border-blue-500"
                    : ""
                }`}
                onClick={() => setSelectedTheater(theater.maHeThongRap)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={theater.logo}
                    alt={theater.tenHeThongRap}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="font-medium">{theater.tenHeThongRap}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cột phải - Rạp và suất chiếu */}
        <div className="w-2/3">
          <h3 className="text-xl font-semibold mb-4">Lịch chiếu phim</h3>

          {/* Filter theo ngày */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <Button
              type={selectedDay === "all" ? "primary" : "default"}
              size="small"
              onClick={() => setSelectedDay("all")}
            >
              Tất cả
            </Button>
            <Button
              type={selectedDay === "monday" ? "primary" : "default"}
              size="small"
              onClick={() => setSelectedDay("monday")}
            >
              Thứ 2
            </Button>
            <Button
              type={selectedDay === "tuesday" ? "primary" : "default"}
              size="small"
              onClick={() => setSelectedDay("tuesday")}
            >
              Thứ 3
            </Button>
            <Button
              type={selectedDay === "wednesday" ? "primary" : "default"}
              size="small"
              onClick={() => setSelectedDay("wednesday")}
            >
              Thứ 4
            </Button>
            <Button
              type={selectedDay === "thursday" ? "primary" : "default"}
              size="small"
              onClick={() => setSelectedDay("thursday")}
            >
              Thứ 5
            </Button>
            <Button
              type={selectedDay === "friday" ? "primary" : "default"}
              size="small"
              onClick={() => setSelectedDay("friday")}
            >
              Thứ 6
            </Button>
            <Button
              type={selectedDay === "saturday" ? "primary" : "default"}
              size="small"
              onClick={() => setSelectedDay("saturday")}
            >
              Thứ 7
            </Button>
            <Button
              type={selectedDay === "sunday" ? "primary" : "default"}
              size="small"
              onClick={() => setSelectedDay("sunday")}
            >
              Chủ nhật
            </Button>
          </div>
          {movieSchedules.length > 0 ? (
            <div className="space-y-4">
              {movieSchedules.map((cumRap) => (
                <div key={cumRap.maCumRap} className="border rounded p-4">
                  <h4 className="font-semibold mb-2">{cumRap.tenCumRap}</h4>
                  <p className="text-sm text-gray-600 mb-3">{cumRap.diaChi}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {cumRap.danhSachPhim[0].lstLichChieuTheoPhim
                      .filter((lichChieu) => {
                        if (selectedDay === "all") return true;
                        const dayOfWeek = new Date(
                          lichChieu.ngayChieuGioChieu
                        ).getDay();
                        const dayMap = {
                          sunday: 0,
                          monday: 1,
                          tuesday: 2,
                          wednesday: 3,
                          thursday: 4,
                          friday: 5,
                          saturday: 6,
                        };
                        return dayOfWeek === dayMap[selectedDay];
                      })
                      .map((lichChieu) => (
                        <button
                          key={lichChieu.maLichChieu}
                          className="p-2 border rounded text-sm hover:bg-blue-100 hover:border-blue-500"
                          onClick={() =>
                            navigate(`/ticketroom/${lichChieu.maLichChieu}`)
                          }
                        >
                          {new Date(lichChieu.ngayChieuGioChieu).toLocaleString(
                            "vi-VN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">
              Chọn hệ thống rạp để xem lịch chiếu
            </div>
          )}
        </div>
      </div>

      {/* Trailer Modal */}
      <Modal
        title={`Trailer - ${movieDetail.tenPhim}`}
        open={isTrailerModalOpen}
        onCancel={() => setIsTrailerModalOpen(false)}
        footer={null}
        width={800}
        centered
      >
        <div className="aspect-video">
          <iframe
            width="100%"
            height="400"
            src={movieDetail.trailer?.replace("watch?v=", "embed/")}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};
export default MovieDetailPage;
