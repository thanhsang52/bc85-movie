import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListMovieAction } from "../../../stores/movie/index.js";
import { movieService } from "../../../service/movieService";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
export const ListMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listMovie = useSelector((state) => state.movieSlice.listMovie);
  console.log("listMovie: store ", listMovie);
  const fetchListMovie = async () => {
    try {
      const response = await movieService.getListMovies();
      //console.log(response.data);
      dispatch(setListMovieAction(response.data.content));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchListMovie();
  }, []);
  const handleRedirectMovieDetailPage = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-12 mt-3">
      {listMovie.map((movie, index) => {
        return (
          <Card
            onClick={() => handleRedirectMovieDetailPage(movie.maPhim)}
            key={index}
            hoverable
            // style={{ width: 240 }}
            cover={
              <img alt="example" src={movie.hinhAnh} className="!h-[250px]" />
            }
          >
            <h3>{movie.tenPhim}</h3>
          </Card>
        );
      })}
    </div>
  );
};
export default ListMovie;
