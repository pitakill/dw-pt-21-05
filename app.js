require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
  app.use(function (err, _, res, _) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use("/", require("./routes/users"));

app.use(function (_, _, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + server.address().port);
});
