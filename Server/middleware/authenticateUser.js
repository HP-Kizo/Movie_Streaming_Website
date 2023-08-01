const moviesList = require("../models/movies");

const genreList = require("../models/genre");

const videoList = require("../models/video");

const userTokens = require("../models/userToken");

// Middleware xác thực người dùng
const authenticateUser = (req, res, next) => {
  const token = req.header("Token"); // Lấy token từ header của request thông qua phương thức của req
  console.log("Token", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Kiểm tra xem token của người dùng có tồn tại trong danh sách hay không
  const foundUser = userTokens.all().find((user) => user.token === token);
  console.log(foundUser);
  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Lưu user vào trong req để lỡ lần sau cần sử dụng
  req.user = foundUser;

  // Nếu token hợp lệ, gọi hàm next() để tiếp tục xử lý các route khác
  next();
};

module.exports = authenticateUser;
