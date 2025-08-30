import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListMovieAction } from "../../../stores/movie/index.js";
import { movieService } from "../../../service/movieService";
import { Card, Rate, Button } from "antd";
import { useNavigate } from "react-router-dom";
export const ListMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listMovie = useSelector((state) => state.movieSlice.listMovie);
  const [filter, setFilter] = useState('all');
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
  const filteredMovies = listMovie.filter(movie => {
    if (filter === 'hot') return movie.hot;
    if (filter === 'dangChieu') return movie.dangChieu;
    if (filter === 'sapChieu') return movie.sapChieu;
    return true;
  });

  return (
    <div>
      <div className="flex justify-center gap-4 mb-6">
        <Button 
          type={filter === 'all' ? 'primary' : 'default'}
          onClick={() => setFilter('all')}
        >
          Tất cả
        </Button>
        <Button 
          type={filter === 'hot' ? 'primary' : 'default'}
          onClick={() => setFilter('hot')}
        >
          Phim hot
        </Button>
        <Button 
          type={filter === 'dangChieu' ? 'primary' : 'default'}
          onClick={() => setFilter('dangChieu')}
        >
          Đang chiếu
        </Button>
        <Button 
          type={filter === 'sapChieu' ? 'primary' : 'default'}
          onClick={() => setFilter('sapChieu')}
        >
          Sắp chiếu
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-12 mt-3">
        {filteredMovies.map((movie, index) => {
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
            <h3 className="mb-2">{movie.tenPhim}</h3>
            <Rate 
              disabled 
              value={movie.danhGia / 2} 
              allowHalf 
              className="text-sm"
            />
          </Card>
        );
        })}
      </div>
    </div>
  );
};
export default ListMovie;
