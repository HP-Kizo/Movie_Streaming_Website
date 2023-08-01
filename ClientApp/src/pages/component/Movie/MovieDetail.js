import React, { memo, useEffect, useState } from "react";
import YouTube from "react-youtube";
import useSendRequest from "../../CustomHook/useSendRequest";
import styles from "./MovideDetail.module.css";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { getDate, getMonth, getYear } from "date-fns";
function MovieDetail({ data, movie }) {
  // Sử dụng Customhook để tránh lặp code ko cần thiết. Lấy hàm sendRequest ra từ Customhook.

  const { sendRequest } = useSendRequest();
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!!data || !!movie) {
      return setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [data, movie]);

  const published_at =
    data.published_at || (movie ? movie.first_air_date : new Date());
  const currentDate = new Date(published_at);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <React.Fragment>
      {isLoaded && (
        <div className={styles.div_all}>
          <div className={styles.content}>
            <h2>{data.name || movie.title}</h2>
            <span className={styles.span}></span>
            <p>
              Release Date: {day}-{month}-{year}
            </p>
            <p>Vote: {movie.vote_average}/10</p>
            <p>{movie.overview}</p>
          </div>
          <div className={styles.trailer}>
            {data.key ? (
              <YouTube videoId={data.key} opts={opts} />
            ) : (
              <img
                src={
                  `https://image.tmdb.org/t/p/w500${items.backdrop_path}` ||
                  `https://image.tmdb.org/t/p/w500${items.poster_path}`
                }
              />
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default memo(MovieDetail);
