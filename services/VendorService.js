const OrderService = require("./OrderService");
const OrderModel = require("../models/Orders");
const TourModel = require("../models/TourPack");
const { default: mongoose } = require("mongoose");
module.exports = {
  getRefundTourRequests: async (user) => {
    let refundRequests = await OrderService.getRefundRequestsByVendorID(user);
    if (refundRequests) {
      return refundRequests;
    } else {
      let e = new Error();
      e.message = "No Refund Requests";
      e.statusCode = 404;
      throw e;
    }
  },
  getDashboard: async (user) => {
    let dahsboard = {};
    // console.log(user.id);
    let tours = await TourModel.find({ vendorID: user.id }).populate([
      "source",
      "destination",
    ]);
    let reservationRequests = await OrderModel.find({
      isApproved: false,
      // "tourID.vendorID": user.id,
    })
      .populate(["touristID", "tourID"])
      .select(["-password"]);
    // OrderService.getPendingReservationRequests(
    //   user
    // );
    // console.log(reservationRequests);
    // console.log(reservationRequests[0].tourID.vendorID);
    reservationRequests = reservationRequests.filter((item) => {
      return String(item.tourID.vendorID) == String(user.id);
    });
    let refundRequests = await module.exports.getRefundTourRequests(user);
    dahsboard.reservationRequests = reservationRequests;
    dahsboard.refundRequests = refundRequests;
    dahsboard.myTours = tours;
    return dahsboard;
  },
  acceptRefundRequest: async () => {},
  rejectRefundTourRequest: async () => {},
  refundByTourID: async () => {},
  rejectReservationRequest: async (id, user) => {
    let requests = await OrderService.rejectTour(id);
    if (reqquests) return requests;
    else {
      let e = new Error("NOT FOUND");
      e.statusCode = 404;
      throw e;
    }
  },
};
