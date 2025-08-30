import React, { useEffect, useState } from "react";
import { theaterService } from "../../../service/theaterService";
import { Collapse } from "antd";

const Schedule = ({ selectedTheater }) => {
  const [schedules, setSchedules] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState(null);

  const fetchSchedules = async () => {
    if (!selectedTheater) return;
    try {
      const response = await theaterService.getListSchedules(selectedTheater);
      setSchedules(response.data.content);
      if (
        response.data.content.length > 0 &&
        response.data.content[0].lstCumRap.length > 0
      ) {
        setSelectedCinema(response.data.content[0].lstCumRap[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [selectedTheater]);

  if (!selectedTheater) {
    return <div>Chọn hệ thống rạp để xem lịch chiếu</div>;
  }

  const allCinemas = schedules.flatMap((theater) => theater.lstCumRap);

  return (
    <div className="flex">
      {/* Cột trái - Danh sách rạp */}
      <div className="w-1/3 border-r">
        <h3 className="font-bold p-3">Danh sách rạp</h3>
        {allCinemas.map((cumRap) => (
          <div
            key={cumRap.maCumRap}
            className={`p-3 cursor-pointer hover:bg-gray-100 ${
              selectedCinema?.maCumRap === cumRap.maCumRap ? "bg-blue-100" : ""
            }`}
            onClick={() => setSelectedCinema(cumRap)}
          >
            <div className="font-medium">{cumRap.tenCumRap}</div>
            <div className="text-sm text-gray-500">{cumRap.diaChi}</div>
          </div>
        ))}
      </div>

      {/* Cột phải - Phim và giờ chiếu */}
      <div className="w-2/3 max-h-96 overflow-y-auto custom-scrollbar">
        <h3 className="font-bold p-3">Lịch chiếu phim</h3>
        {selectedCinema ? (
          <div className="p-3">
            <Collapse
              items={selectedCinema.danhSachPhim.map((phim) => ({
                key: phim.maPhim,
                label: (
                  <div className="flex items-center">
                    <img
                      src={phim.hinhAnh}
                      alt={phim.tenPhim}
                      className="w-12 h-16 object-cover mr-3"
                    />
                    <span className="font-medium">{phim.tenPhim}</span>
                  </div>
                ),
                children: (
                  <div className="grid grid-cols-4 gap-2">
                    {phim.lstLichChieuTheoPhim.map((lichChieu) => (
                      <button
                        key={lichChieu.maLichChieu}
                        className="p-2 border rounded text-sm hover:bg-blue-100"
                      >
                        {new Date(
                          lichChieu.ngayChieuGioChieu
                        ).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </button>
                    ))}
                  </div>
                ),
              }))}
            />
          </div>
        ) : (
          <div className="p-3 text-gray-500">Chọn rạp để xem lịch chiếu</div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
