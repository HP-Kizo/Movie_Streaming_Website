import { set } from "date-fns";
import React, { memo, useEffect, useState } from "react";
// import './NavBar.css'
function NavBar() {
  // Sử dụng 1 biến tạm làm điều kiện hiển thị background
  let BG = true;

  const [scrollPosition, setScrollPosition] = useState(0);
  const handlerScroll = () => {
    // Lấy vị trí nơi mình cuộn
    let position = window.pageYOffset;
    setScrollPosition(position);
  };
  // Nếu vị trí các top của trang 100px sẽ thay đổi background
  if (scrollPosition >= 100) {
    BG = false;
  } else {
    BG = true;
  }

  useEffect(() => {
    // Clear code tránh re-render ko cần thiết
    const identifer = setInterval(() => {
      window.addEventListener("scroll", handlerScroll);
    }, 500);
    return () => {
      clearInterval(identifer);
    };
  });
  // Bài ko yêu cầu nên chưa tạo code cho phần này
  function handlerSearch() {
    console.log(2);
  }
  return (
    <nav className={BG ? "bg_black nav" : "bg_transparent nav"} id="navbar">
      <a href="/" className="movie_app">
        Movie App
      </a>
      <a href="/search" className="click_search">
        <svg
          className="svg-inline--fa fa-search fa-w-16"
          fill="#ccc"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="search"
          width="24px"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={handlerSearch}
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </a>
    </nav>
  );
}
export default memo(NavBar);
