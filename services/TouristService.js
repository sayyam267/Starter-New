const UserModel = require("../models/UserModel");
const OrderService = require("./OrderService");
const UserService = require("./UserService");
const TransactionService = require("./TransactionService");
const CustomTour = require("../models/CustomTour");
const FavToursService = require("./FavToursService");
const TransactionsModel = require("../models/Transactions.model");
const FavTours = require("../models/FavTours");
const RatingService = require("./RatingService");
const OrderModel = require("../models/Orders");
const RatingModel = require("../models/Rating");
module.exports = {
  getProfileInfo: async (user) => {
    let details = await UserModel.findById(user.id)
      .select([
        "fname",
        "lname",
        "city",
        "balance",
        "profilePicture",
        "gender",
        "phoneNumber",
        "email",
        "isRating",
        "rating",
      ])
      .populate("city");
    if (details) {
      return details;
    } else {
      let e = new Error();
      e.message = "NOT FOUND";
      e.statusCode = 404;
      throw e;
    }
  },
  getMyTours: async (user) => {
    let myTours = await OrderService.getMyOrders(user);
    if (myTours) {
      return myTours;
    } else {
      let e = new Error();
      e.message = "NOT FOUND";
      e.statusCode = 404;
      throw e;
    }
  },
  getDashboard: async (user) => {
    let dashboard = {};
    let myOrders = await OrderModel.find({ touristID: user.id });
    // await module.exports.getMyOrders(user);
    let myTransactions = await module.exports.getMyTransactions(user);
    let favTours = await FavTours.find({ touristID: user.id });
    favTours = favTours.tours;
    let moneySpent = 0;
    let myRatings = await RatingModel.find({ touristID: user.id });
    // .getRatingsByTouristID(user.id);
    let tempMoney = await OrderModel.find({
      touristID: user.id,
      isApproved: true,
      isRefunded: false,
    });
    // .getMyOrders(user);
    if (tempMoney) {
      tempMoney.forEach((order) => {
        moneySpent += order.amount;
      });
    }
    dashboard.myOrders = myOrders;
    dashboard.myTransactions = myTransactions;
    dashboard.favTours = favTours;
    dashboard.moneySpent = moneySpent;
    dashboard.myComments = myRatings;
    return dashboard;
  },
  buyTBCredits: async (req) => {
    let trans = await TransactionService.rechargeAccount(req);
    if (trans) {
      return trans;
    } else {
      let e = new Error();
      e.message = "Error Occured While performing Transaction";
      e.statusCode = 400;
      throw e;
    }
  },
  refundTBCredits: async (req) => {
    let refund = await TransactionService.refundPurchase(req);
    if (refund) {
      return refund;
    } else {
      let e = new Error();
      e.message = "Error Occured While performing Refund";
      e.statusCode = 400;
      throw e;
    }
  },
  reserveTour: async (data) => {
    let tour = await OrderService.createOrder(data);
    if (tour) {
      return tour;
    } else {
      let e = new Error();
      e.message = "Error Creating Order";
      e.statusCode = 400;
      throw e;
    }
  },
  // requestCustomTour: async (data) => {
  //   // let customTour = await CustomTour({
  //   //   ...data,
  //   // });
  //   // await customTour.save();
  // },
  addFavTours: async (data) => {
    let favTours = await FavToursService.addFavTour(data.user.id, data.tourID);
    if (favTours) {
      return favTours;
    } else {
      let e = new Error();
      e.message = "Problem Adding Tour to Fav Tours";
      e.statusCode = 400;
      throw e;
    }
  },
  getMyOrders: async (user) => {
    let myOrders = await OrderService.getMyOrders(user);
    if (myOrders) return myOrders;
    else {
      let e = new Error();
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
  },
  getMyTransactions: async (user) => {
    let myTrans = await TransactionsModel.find({ touristID: user.id }).sort(
      "-updatedAt"
    );
    if (myTrans) return myTrans;
    else {
      let e = new Error();
      e.message = "NOT FOUND";
      e.statusCode = 404;
      throw e;
    }
  },
  requestRefund: async (orderID) => {
    let order = await OrderModel.findOneAndUpdate(
      { _id: orderID },
      { $set: { requestRefund: true } }
    );
    if (order) return true;
    else {
      let e = new Error("Not Found");
      e.statusCode = 404;
      throw e;
    }
  },
};
