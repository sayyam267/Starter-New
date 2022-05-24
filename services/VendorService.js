const OrderService = require("./OrderService");

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
    let reservationRequests = await OrderService.getPendingReservationRequests(
      user
    );
    let refundRequests = await module.exports.getRefundTourRequests();
    dahsboard.reservationRequests = reservationRequests;
    dahsboard.refundRequests = refundRequests;
    return dahsboard;
  },
  acceptRefundRequest: async () => {},
  rejectRefundTourRequest: async () => {},
  refundByTourID: async () => {},
};
