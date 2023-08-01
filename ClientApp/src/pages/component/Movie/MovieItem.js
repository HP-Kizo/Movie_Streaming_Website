import React, { useState, useEffect, useRef, memo } from "react";
import useSendRequest from "../../CustomHook/useSendRequest";
import MovieDetail from "./MovieDetail";
function MovieItem(props) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clickMovie, setClickMovie] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [dataProps, setDataProps] = useState(null);
  const { sendRequest } = useSendRequest();
  // Sử dụng Customhook để tránh lặp code ko cần thiết. Lấy hàm sendRequest ra từ Customhook.
  useEffect(() => {
    fetch(props.data, {
      headers: {
        Token: "8qlOkxz4wq",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data_respon) => {
        // Lấy ngẫu nhiên dữ liệu 1 bộ phim từ API
        setItems(data_respon.results);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
    // sendRequest(props.data).then((data_respon) => {
    //   // Lấy dữ liệu từ API rồi gán vào items.
    //   setItems(data_respon.results);
    //   setIsLoaded(!isLoaded);
    // });
  }, []);
  const postFilmId = (id, movie) => {
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
        setDataProps(movie);

        console.error("Lỗi:", error);
      });
  };

  return (
    <React.Fragment>
      <h3 className="header">{props.header}</h3>
      <div
        className={props.isPoster ? "div_listItem" : "div_listItem_backdrop"}
      >
        {isLoaded &&
          items.map((res, index) => {
            if (props.isPoster) {
              if (index < 10) {
                return (
                  <div key={res.id + index}>
                    <button
                      className="button_movie"
                      onClick={() => {
                        postFilmId(res.id, res);
                        //Sử dụng localStorage lưu id bộ phim xuống trình duyệt, nếu id bị trùng sẽ ẩn phần nội dung phụ
                        if (localStorage.getItem("id_Movie") == res.id) {
                          setClickMovie(false);
                          localStorage.removeItem("id_Movie");
                        } else {
                          localStorage.setItem(
                            "id_Movie",
                            JSON.stringify(res.id)
                          );
                          setClickMovie(true);
                        }
                      }}
                    >
                      <img
                        key={res.id}
                        src={
                          props.isPoster
                            ? `https://image.tmdb.org/t/p/w500${res.poster_path}`
                            : `https://image.tmdb.org/t/p/w500${res.backdrop_path}`
                        }
                        className={
                          props.isPoster ? "img_poster" : "img_backdrop"
                        }
                      />
                    </button>
                  </div>
                );
              }
            } else {
              return (
                <div key={res.id + index}>
                  <button
                    className="button_movie"
                    onClick={() => {
                      postFilmId(res.id, res);

                      //Sử dụng localStorage lưu id bộ phim xuống trình duyệt, nếu id bị trùng sẽ ẩn phần nội dung phụ

                      if (localStorage.getItem("id_Movie") == res.id) {
                        setClickMovie(false);
                        localStorage.removeItem("id_Movie");
                      } else {
                        localStorage.setItem(
                          "id_Movie",
                          JSON.stringify(res.id)
                        );
                        setClickMovie(true);
                      }
                    }}
                  >
                    <img
                      key={res.id}
                      src={
                        props.isPoster
                          ? `https://image.tmdb.org/t/p/w500${res.poster_path}`
                          : `https://image.tmdb.org/t/p/w500${res.backdrop_path}`
                      }
                      className={props.isPoster ? "img_poster" : "img_backdrop"}
                    />
                  </button>
                </div>
              );
            }
          })}
      </div>
      {dataItem && dataProps && clickMovie && (
        <MovieDetail data={dataItem} movie={dataProps}></MovieDetail>
      )}
    </React.Fragment>
  );
}
export default memo(MovieItem);
