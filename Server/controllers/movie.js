const moviesList = require("../models/movies");

const genreList = require("../models/genre");

const videoList = require("../models/video");

const userTokens = require("../models/userToken");

// Tạo 1 function chung để lấy các dữ liệu
const functionHandlerPageSplit = (applicableObject, currentPage, genre_id) => {
  const page = parseInt(currentPage) || 1;
  const genreID = parseInt(genre_id) || "";
  if (!genreID) {
    // Tạo ra các biến để tính toán chia các trang

    let perPage = 20;
    const totalPages = Math.ceil(applicableObject.length / perPage);
    let startPage = (page - 1) * perPage;
    let endPage = startPage + perPage;

    // Cắt danh sách phim theo chỉ mục bắt đầu và kết thúc
    const listMoviesAfterHandler = applicableObject.slice(startPage, endPage);
    console.log("OK");
    return {
      results: listMoviesAfterHandler,
      page: page,
      totalPage: totalPages,
    };
  } else {
    // Tạo ra các biến để tính toán chia các trang
    const genre = genreList.all().filter((res) => res.id === genreID);

    let perPage = 20;
    const totalPages = Math.ceil(applicableObject.length / perPage);

    let startPage = (page - 1) * perPage;
    let endPage = startPage + perPage;

    // Cắt danh sách phim theo chỉ mục bắt đầu và kết thúc
    const listMoviesAfterHandler = applicableObject.slice(startPage, endPage);
    console.log("OKOK");
    return {
      results: listMoviesAfterHandler,
      page: page,
      totalPage: totalPages,
      genre_name: genre[0].name,
    };
  }
};

exports.getMovieTrending = (req, res, next) => {
  const currentPage = req.query.page;
  const genre_id = req.query.genre_id;

  const data = functionHandlerPageSplit(
    moviesList.all(),
    currentPage,
    genre_id
  );
  const response = {
    results: data.results,
    page: data.page,
    totalPage: data.totalPage,
  };

  res.status(200).json(response);
};

// GET các movies có raiting cao
exports.getMovieRaiting = (req, res, next) => {
  const currentPage = req.query.page;
  const genre_id = req.query.genre_id;

  // Sắp xếp dữ liệu theo thứ tự giảm dần
  const sortedMovies = moviesList
    .all()
    .sort((a, b) => b.vote_average - a.vote_average);
  const data = functionHandlerPageSplit(sortedMovies, currentPage, genre_id);
  const response = {
    results: data.results,
    page: data.page,
    totalPage: data.totalPage,
  };
  console.log(response);
  res.status(200).json(response);
};

// Get các movies theo thể loại
exports.getMovieDiscover = (req, res, next) => {
  const currentPage = req.query.page;
  const genreID = req.params.category;
  console.log(genreID);
  // Nếu ko có genre ID báo lỗi 400
  if (!genreID || isNaN(genreID)) {
    return res.status(400).json({ message: "Not found film_id parram" });
  }
  const genre_ = genreList.all().filter((res) => res.id === parseInt(genreID));
  if (genre_.length === 0) {
    return res.status(400).json({ message: "Not found video" });
  }
  const listGenreMovies = moviesList
    .all()
    .filter((res) => res.genre_ids.includes(parseInt(genreID)));
  const data = functionHandlerPageSplit(listGenreMovies, currentPage, genreID);
  const response = {
    results: data.results,
    page: data.page,
    totalPage: data.totalPage,
    genre_name: data.genre_name,
  };
  res.status(200).json(response);
};

exports.postTrailer = (req, res, next) => {
  const filmId = req.body.id;
  console.log("ID", filmId);
  if (!filmId) {
    return res.status(400).json({ message: "Not found film_id param" }); // Trả về lỗi 400 nếu không có film_id
  }
  const video = videoList.all().find((video) => video.id == filmId); // Tìm phim có id trùng khớp với filmId trong danh sách videos
  if (!video) {
    return res.status(404).json({ message: "Not found video" }); // Trả về lỗi 404 nếu không tìm thấy phim
  }
  // Biến để lưu video phù hợp
  let selectedVideo = null;
  // Biến để lưu thời gian published_at mới nhất
  let latestPublicshedAt = null;
  video.videos.forEach((res) => {
    if (
      res.official &&
      res.site === "YouTube" &&
      (res.type === "Trailer" || res.type === "Teaser")
    ) {
      let publicshedAt = new Date(res.published_at);
      if (!latestPublicshedAt || publicshedAt > latestPublicshedAt) {
        selectedVideo = res;
        latestPublicshedAt = publicshedAt;
      }
    }
  });
  if (!selectedVideo) {
    return res.status(404).json({ message: "Not found video" }); // Trả về lỗi 404 nếu không tìm thấy video phù hợp
  }

  return res.status(200).json(selectedVideo);
};

exports.postSearchMovie = (req, res, next) => {
  const keyword = req.body.keyword;
  const currentPage = req.query.page;
  if (!keyword) {
    return res.status(404).json({ message: "Not found keyword parram" });
  }
  const genre_id =
    keyword.genre !== "all"
      ? parseInt(
          genreList
            .all()
            .filter((res) => res.name.toLowerCase() === keyword.genre)[0].id
        )
      : "all";
  const listMoviesSearch = moviesList.all().filter((res) => {
    const title = res.title ? res.title.toLowerCase() : res.name.toLowerCase();
    const overview = res.overview.toLowerCase();
    const keywordLower = keyword.inputMovie.toLowerCase();
    const language = keyword.language;
    const type = keyword.type.toLowerCase();
    const year = keyword.year;
    const year_release = res.release_date
      ? new Date(res.release_date).getFullYear()
      : res.first_air_date
      ? new Date(res.first_air_date).getFullYear()
      : null;
    return (
      (title.toLowerCase().includes(keywordLower) &&
        (genre_id === "all" || res.genre_ids.includes(genre_id)) &&
        (type === "all" || res.media_type === type) &&
        (language === "all" || res.original_language === language) &&
        (year === "all" || year_release == year)) ||
      (overview.includes(keywordLower) &&
        (genre_id === "all" || res.genre_ids.includes(genre_id)) &&
        (type === "all" || res.media_type === type) &&
        (language === "all" || res.original_language === language) &&
        (year === "all" || year_release == year))
    );
  });
  const data = functionHandlerPageSplit(listMoviesSearch, null, null);
  const response = {
    results: data.results,
    page: data.page,
    totalPage: data.totalPage,
  };
  return res.status(200).json(response);
};

exports.errol_404 = (req, res, next) => {
  return res.status(404).json({ message: "Route not found" });
};
