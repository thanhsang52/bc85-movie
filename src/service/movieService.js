import { axiosCustom } from "./config";
export const movieService = {
  getListMovies: () => {
    return axiosCustom.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  getMovieDetail: (movieId) => {
    return axiosCustom.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
  },
  createMovie: (movie) => axiosCustom.post("/movies", movie),
  updateMovie: (id, movie) => axiosCustom.put(`/movies/${id}`, movie),
  deleteMovie: (id) => axiosCustom.delete(`/movies/${id}`),
};
