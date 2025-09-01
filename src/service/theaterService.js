import { axiosCustom } from "./config";
export const theaterService = {
  getListTheaters: () => {
    return axiosCustom.get("/QuanLyRap/LayThongTinHeThongRap");
  },
  getTheaterDetail: (movieId) => {
    return axiosCustom.get(
      `/QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${theaterId}`
    );
  },
  getListSchedules: (maHeThongRap) => {
    return axiosCustom.get(
      `/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}`
    );
  },
  getTicketRoom: (maLichChieu) => {
    return axiosCustom.get(
      `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  },
  bookTicket: (ticketData) => {
    return axiosCustom.post("/QuanLyDatVe/DatVe", ticketData);
  },
};
