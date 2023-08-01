import React, { memo, useState } from "react";
import { set, setYear } from "date-fns";

import styles from "./SearchForm.module.css";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

function SearchForm(props) {
  const [inputMovie, setInputMovie] = useState("");
  const [click, setClick] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedMediaType, setSelectedMediaType] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  function handlerClickSearch() {
    // Sử dụng props để truyền ngược dữ liệu lên component cha, dữ liệu chính là chuỗi người dùng nhập
    props.getData({
      inputMovie,
      genre: selectedGenre,
      language: selectedLanguage,
      type: selectedMediaType,
      year: selectedYear,
    });
  }
  function handlerClickReset() {
    setInputMovie("");
  }
  return (
    <div className={styles.div}>
      <div className={styles.data_input}>
        <div className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm phim..."
            onChange={(e) => {
              // Gán dữ liệu người dùng nhập vào
              setInputMovie(e.target.value);
            }}
            // Ràng buộc cho ô
            value={inputMovie}
          />
          <select
            className="genre-select"
            onChange={(e) => {
              setSelectedGenre(e.target.value);
            }}
          >
            <option value="all">Genre</option>
            <option value="action">Action</option>
            <option value="romance">Romance</option>
            <option value="comedy">Comedy</option>
          </select>
          <select
            className="media-type-select"
            onChange={(e) => {
              setSelectedMediaType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
            <option value="person">Person</option>
          </select>
          <select
            className="language-select"
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
            }}
          >
            <option value="all">Language</option>
            <option value="en">English (US)</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
          <select
            className="year-select"
            onChange={(e) => {
              setSelectedYear(e.target.value);
            }}
          >
            <option value="all">Year of Release</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
      </div>
      <span className={styles.span}></span>
      <div className={styles.button}>
        <button className={styles.reset} onClick={handlerClickReset}>
          RESET
        </button>
        <button className={styles.search} onClick={handlerClickSearch}>
          SEARCH
        </button>
      </div>
    </div>
  );
}
export default memo(SearchForm);
