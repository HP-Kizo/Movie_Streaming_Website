import React from "react";
import MovieItem from "./MovieItem";
function Movielist() {
  return (
    <div>
      {/* Sử dụng các link API trong data */}
      <MovieItem
        data="http://localhost:5000/movie/api/movies/trending"
        isPoster={true}
        header="Xu hướng"
      ></MovieItem>
      <MovieItem
        data="http://localhost:5000/movie/api/movies/top-rate"
        header="Xếp hạng cao"
      ></MovieItem>
      <MovieItem
        data="http://localhost:5000/movie/api/movies/28"
        header="Hành động"
      ></MovieItem>
      <MovieItem
        data="http://localhost:5000/movie/api/movies/35"
        header="Hài"
      ></MovieItem>
      <MovieItem
        data="http://localhost:5000/movie/api/movies/27"
        header="Kinh dị"
      ></MovieItem>
      <MovieItem
        data="http://localhost:5000/movie/api/movies/10749"
        header="Lãng mạn"
      ></MovieItem>
      <MovieItem
        data="http://localhost:5000/movie/api/movies/99"
        header="Tài liệu"
      ></MovieItem>
    </div>
  );
}
export default Movielist;
