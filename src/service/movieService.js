import { axiosCustom } from "./config";
export const movieService = {
  getListMovies: () => {
    return axiosCustom.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  getMovieDetail: (movieId) => {
    return axiosCustom.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
  },
  createMovie: (movie) =>
    axiosCustom.post("/QuanLyPhim/ThemPhimUploadHinh", movie),
  updateMovie: (payload) =>
    axiosCustom.post(`/QuanLyPhim/CapNhatPhimUpload`, payload),
  deleteMovie: (id) => axiosCustom.delete(`/QuanLyPhim/XoaPhim?MaPhim=${id}`),
};
