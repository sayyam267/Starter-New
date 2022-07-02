const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT;
require("./helpers/GoogleAuth");
require("./helpers/passport");
app.use(express.json());
app.use(require("cors")());
const string = process.env.CONNECTION_STRING;
const getRoutes = require("./routes/index.js");

mongoose
  .connect(string)
  .then((res) => {
    console.log(`Connected to DB `);
  })
  .catch((e) => {
    console.log(e);
  });

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});
getRoutes(app);
app.use(limiter);
app.use(express.static(path.join("public")));

app.get("/", (req, res) => {
  res.send("<h1>TourBook backend</h1>");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/404.html"));
});
app.listen(port, (req, res) => {
  console.log(`Listening on Port ${port}`);
});
