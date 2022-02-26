const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json());
app.use(require("cors")());
const string = process.env.CONNECTION_STRING;
const AdminRoute = require("./routes/AdminRoute");
const TouristRoute = require("./routes/TouristRoute");
const TourGuideRoute = require("./routes/TourGuideRoute");
const VendorRoute = require("./routes/VendorRoute");

mongoose
  .connect(string)
  .then((res) => {
    console.log(`Connected to DB `);
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/admin", AdminRoute);
app.use("/tourist", TouristRoute);
app.use("/guide", TourGuideRoute);
app.use("/vendor", VendorRoute);

app.listen(port, (req, res) => {
  console.log(`Listening on Port ${port}`);
});
