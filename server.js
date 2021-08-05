const express = require("express");
const app = express();
const checkMiddleware = (req, res, next) => {
  const d = new Date();
  if (d.getDay < 6 && 0 < d.getDay < 6 && 8 < d.getHours && 17 > d.getHours) {
    next();
  } else {
    res.render("notworking")
  }
};

var server = app.listen(7000, function () {
  var port = server.address().port;
  console.log("Server listening on port:", port);
});
app.use(checkMiddleware);
app.use(express.static("public"));
app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/views/style.css");
});

app.set("view engine", "ejs");

app.set("views", __dirname + "/views");
app.get("/", function (req, res) {
  res.render("index.ejs");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
