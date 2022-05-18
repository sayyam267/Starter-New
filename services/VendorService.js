const OrderService = require("./OrderService");

module.exports = {
  getRefundTourRequests: async (user) => {
    let refundRequests = await OrderService.getOrderByVendorID(user.id);
    if (refundRequests) {
      return refundRequests;
    } else {
      let e = new Error();
      e.message = "No Refund Requests";
      e.statusCode = 404;
      throw e;
    }
  },
  acceptRefundRequest: async () => {},
  rejectRefundTourRequest: async () => {},
  refundByTourID: async () => {},
};
