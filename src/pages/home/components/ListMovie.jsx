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
            className="relative"
            cover={
              <div className="relative">
                <img alt="example" src={movie.hinhAnh} className="!h-[250px]" />
                {filter === 'all' && (
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {movie.hot && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">🔥 HOT</span>
                    )}
                    {movie.dangChieu && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">▶️ Đang chiếu</span>
                    )}
                    {movie.sapChieu && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">⏰ Sắp chiếu</span>
                    )}
                  </div>
                )}
              </div>
            }
          >
            <h3 className="mb-2 font-semibold text-center text-gray-800 leading-tight line-clamp-2 min-h-[3rem]">{movie.tenPhim}</h3>
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
