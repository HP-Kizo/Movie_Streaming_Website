import React, { useState, useEffect, memo, useRef } from "react";
import useSendRequest from "../../CustomHook/useSendRequest";
import YouTube from "react-youtube";

import styles from "./ResultDetail.module.css";

function ResultDetail({ data, movie }) {
  const { sendRequest } = useSendRequest();
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const divRef = useRef(null);

  const published_at =
    data.published_at || (movie ? movie.first_air_date : false);
  const currentDate = !!published_at ? new Date(published_at) : new Date();
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

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, movie]);

  return (
    <React.Fragment>
      <div ref={divRef} className={styles.div_all}>
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
              src={`https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
              }`}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default memo(ResultDetail);
