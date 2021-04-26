var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
  io.on("connection", (socket) => {
    console.log("a user connected");
  });
});

module.exports = router;
