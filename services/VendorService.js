const OrderService = require("./OrderService");
const TourModel = require("../models/TourPack");
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
    let tours = await TourModel.find({ vendorID: user.id }).populate([
      "source",
      "destination",
    ]);
    let reservationRequests = await OrderService.getPendingReservationRequests(
      user
    );
    let refundRequests = await module.exports.getRefundTourRequests(user);
    dahsboard.reservationRequests = reservationRequests;
    dahsboard.refundRequests = refundRequests;
    dahsboard.myTours = tours;
    return dahsboard;
  },
  acceptRefundRequest: async () => {},
  rejectRefundTourRequest: async () => {},
  refundByTourID: async () => {},
};
