const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const authenticateUser = require("./middleware/authenticateUser");
const app = express();

app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.get("/test", (req, res, next) => {
//   console.log("Test OK");
//   const data = {
//     message: "Test okOK",
//   };
//   res.json(data);
// });

const movieRoutes = require("./routes/movie");
app.use(authenticateUser);
app.use("/movie", movieRoutes);

app.listen(5000);
