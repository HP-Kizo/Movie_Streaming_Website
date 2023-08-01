const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../data/genreList.json");
const Genre = {
  all: function () {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  },
};
module.exports = Genre;
