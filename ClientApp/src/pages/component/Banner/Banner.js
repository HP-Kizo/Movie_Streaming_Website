import React, { useEffect, useCallback, useState, memo } from "react";
import useSendRequest from "../../CustomHook/useSendRequest";
import styles from "./Banner.module.css";
import axios from "axios";
// Sử dụng module css để css riêng cho từng phần
function Banner({ data }) {
  // Sử dụng Customhook để tránh lặp code ko cần thiết. Lấy hàm sendRequest ra từ Customhook.
  const { sendRequest } = useSendRequest();
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // Lấy dữ liệu từ API
  useEffect(() => {
    fetch("http://localhost:5000/movie/api/movies/trending", {
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
        setItems(
          data_respon.results[
            Math.floor(Math.random() * data_respon.results.length - 1)
          ]
        );
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.fragment}>
      {/* Sau khi có dữ liệu sẽ render ra  */}
      {isLoaded && (
        <div>
          <img
            className={styles.img_Banner}
            src={
              `https://image.tmdb.org/t/p/w500${items.backdrop_path}` ||
              `https://image.tmdb.org/t/p/w500${items.poster_path}`
            }
          />
          <div className={styles.div}>
            <h1>{items.name}</h1>
            <div className={styles.click}>
              <button className={styles.banner_button}>Play</button>
              <button className={styles.banner_button}>Mylist</button>
            </div>
            <p className={styles.banner_description}>{items.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default memo(Banner);
