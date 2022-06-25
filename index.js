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
const passport = require("passport");
const string = process.env.CONNECTION_STRING;
const cookieSession = require("express-session");
// const AdminRoute = require("./routes/AdminRoute");
// const TouristRoute = require("./routes/TouristRoute");
// const TourGuideRoute = require("./routes/TourGuideRoute");
// const VendorRoute = require("./routes/VendorRoute");
const UserRoute = require("./routes/UserRoute");
const OrderRoute = require("./routes/OrderRoute");
const PromoRoute = require("./routes/PromoRoute");
const RatingRoute = require("./routes/RatingRoute");
const UserTypeRoute = require("./routes/UserTypeRoute");
// const ReserveTourRoute = require("./routes/ReserveTourRoute");
const CityRoute = require("./routes/CityRoute");
const TourRoutes = require("./routes/TourRoutes");
const TransactionRoute = require("./routes/TransactionRoute");
const FavTourRoute = require("./routes/FavTourRoute");
const AdminRoute = require("./routes/AdminRoute");
const TouristRoute = require("./routes/TouristRoute");
const VendorRoute = require("./routes/VendorRoute");
const CustomTourRoute = require("./routes/CustomTourRoute");
const OAuth2 = require("./routes/OAuth2");
// const flash = require("express-flash");

// app.use(
//   cookieSession({
//     name: "session",
//     secret: "tourbook",
//     keys: ["google", "facebook", "github", "auth", "by", "passportjs"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );
// app.use(flash());
mongoose
  .connect(string)
  .then((res) => {
    console.log(`Connected to DB `);
  })
  .catch((e) => {
    console.log(e);
  });

// app.use("/admin", AdminRoute);
// app.use("/tourist", TouristRoute);
// app.use("/guide", TourGuideRoute);
// app.use("/vendor", VendorRoute);
// app.use(passport.initialize());
// app.use(passport.session());
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
app.use("/auth", OAuth2);
app.use("/user", UserRoute);
app.use("/promo", PromoRoute);
app.use("/order", OrderRoute);
app.use("/rating", RatingRoute);
app.use("/tour", TourRoutes);
app.use("/city", CityRoute);
app.use("/transaction", TransactionRoute);
app.use("/usertype", UserTypeRoute);
app.use("/favtours/", FavTourRoute);
app.use("/admin/", AdminRoute);
app.use("/tourist", TouristRoute);
app.use("/vendor", VendorRoute);
app.use("/customtour", CustomTourRoute);
// app.use("/request", ReserveTourRoute);
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
