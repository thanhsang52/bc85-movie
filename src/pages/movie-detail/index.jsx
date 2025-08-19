import React from "react";
import { useParams } from "react-router-dom";
export const MovieDetailPage = () => {
  const { movieId } = useParams();
  return <div>Detail page {movieId}</div>;
};
export default MovieDetailPage;
