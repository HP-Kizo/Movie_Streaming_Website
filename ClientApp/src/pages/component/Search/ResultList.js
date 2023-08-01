import React, { memo, useEffect, useState } from "react";
import useSendRequest from "../../CustomHook/useSendRequest";
import ResultDetail from "./ResultDetail";
// import styles from "./ResultList.module.css";

function ResultList({ sendData }) {
  // Sử dụng Customhook để tránh lặp code ko cần thiết. Lấy hàm sendRequest ra từ Customhook.
  const { sendRequest } = useSendRequest();
  const [items, setItems] = useState([]);
  const [dataItem, setDataItem] = useState({});
  const [dataProps, setDataProps] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [clickMovie, setClickMovie] = useState(false);
  // Tạo ra 1 url động để truyền lấy API
  const url = `http://localhost:5000/movie/api/movies/search`;
  const postKeySearch = (key) => {
    // console.log(key);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ keyword: key }), // dữ liệu cần gửi đi
      headers: {
        Token: "8qlOkxz4wq",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // xử lý dữ liệu nhận được từ server
        setItems(data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };
  // dataItem && console.log(dataItem);
  useEffect(() => {
    // Kiểm tra xem đã gõ vào ô tìm kiếm chưa
    if (sendData.inputMovie !== "") {
      postKeySearch(sendData);
    }
  }, [sendData]);

  const postFilmId = (id, movie) => {
    // console.log(id);
    // console.log(movie);
    fetch(`http://localhost:5000/movie/api/movies/video/${id}`, {
      method: "POST",
      body: JSON.stringify({ id: id }), // dữ liệu cần gửi đi
      headers: {
        "Content-Type": "application/json",
        Token: "8qlOkxz4wq",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // xử lý dữ liệu nhận được từ server
        setDataProps(movie);
        setDataItem(data);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };
  return (
    <div className="resultList">
      <h2>Search Result</h2>
      <div>
        {isLoaded &&
          items.results.map((res, index) => {
            let url_img = res.poster_path || res.backdrop_path;
            // Lấy url hình ảnh đề phòng ko có trailer nào thỏa mãn điều kiện
            return (
              <button
                className="button_movie"
                onClick={() => {
                  console.log(res.id);
                  postFilmId(res.id, res);
                  if (localStorage.getItem("id_Movie") == res.id) {
                    setClickMovie(false);
                    localStorage.removeItem("id_Movie");
                  } else {
                    localStorage.setItem("id_Movie", JSON.stringify(res.id));
                    setClickMovie(true);
                  }
                }}
              >
                <img
                  key={res.id}
                  src={`https://image.tmdb.org/t/p/w500${url_img}`}
                  className="img_poster"
                />
              </button>
            );
          })}
      </div>
      {dataItem && dataProps && clickMovie && (
        <ResultDetail data={dataItem} movie={dataProps}></ResultDetail>
      )}
    </div>
  );
}
export default memo(ResultList);
