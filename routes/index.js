const UserRoute = require("./UserRoute");
const OrderRoute = require("./OrderRoute");
const PromoRoute = require("./PromoRoute");
const RatingRoute = require("./RatingRoute");
const UserTypeRoute = require("./UserTypeRoute");
// const ReserveTourRoute = require("./ReserveTourRoute");
const CityRoute = require("./CityRoute");
const TourRoutes = require("./TourRoutes");
const TransactionRoute = require("./TransactionRoute");
const FavTourRoute = require("./FavTourRoute");
const AdminRoute = require("./AdminRoute");
const TouristRoute = require("./TouristRoute");
const VendorRoute = require("./VendorRoute");
const CustomTourRoute = require("./CustomTourRoute");
const OAuth2 = require("./OAuth2");

const getRoutes = (app) => {
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
};

// var fs = require("fs");

// module.exports = function (app) {
//   fs.readdirSync(__dirname).forEach(function (file) {
//     if (file == "index.js") return;
//     var name = file.substr(0, file.indexOf("."));
//     require("./" + name)(app);
//   });
// };
module.exports = getRoutes;
