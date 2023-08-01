import React from "react";
import NavBar from "../component/NavBar/NavBar";
import SearchForm from "../component/Search/SearchForm";
import ResultList from "../component/Search/ResultList";
import { useState } from "react";
const Search = () => {
  const [searchData, setSearchData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isClick, setIsClick] = useState(false);
  // Tạo 1 hàm để xác định đã ấn search chưa từ conponent con

  function getEventClick(childData) {
    setIsClick(childData);
  }
  // Tạo 1 hàm để lấy dữ liệu từ conponent con
  function getData(childData) {
    setSearchData(childData);
    setIsClick(true);
  }
  return (
    <div className="app">
      <NavBar></NavBar>
      <SearchForm getData={getData} getEventClick={getEventClick}></SearchForm>
      {/* Truyền dữ liệu đã lấy từ component con lại component con khác */}
      {isClick && <ResultList sendData={searchData}></ResultList>}
    </div>
  );
};

export default Search;
