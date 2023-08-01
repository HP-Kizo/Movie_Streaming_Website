const fs = require("fs");
const express = require("express");
const router = express.Router();
const movieControllers = require("../controllers/movie");

// Lấy các phim đang là trending
router.get("/api/movies/trending", movieControllers.getMovieTrending);

// Lấy các phim raiting cao
router.get("/api/movies/top-rate", movieControllers.getMovieRaiting);

// Lấy các phim theo thể loại
router.get("/api/movies/:category", movieControllers.getMovieDiscover);

router.post("/api/movies/video/:film_id", movieControllers.postTrailer);

router.post("/api/movies/search", movieControllers.postSearchMovie);

router.use(movieControllers.errol_404);

module.exports = router;
