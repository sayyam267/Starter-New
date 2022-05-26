const OrderService = require("./OrderService");
const VendorService = require("./VendorService");

module.exports = {
  getRefundTourRequests: async (req, res) => {
    try {
      let user = req.user;
      let requests = await VendorService.getRefundTourRequests(user);
      return res.send({ data: requests, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  acceptRefundRequest: async (req, res) => {
    try {
      let refund = await OrderService.refundOrder(req.body);
      return res.send({ data: refund, message: "Refunded" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  rejectRefundTourRequest: async (req, res) => {
    try {
      let rejectRefund = await OrderService.rejectRefundRequest(req.body);
      return res.send({ data: rejectRefund, message: "Rejected" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  getDashboard: async (req, res) => {
    try {
      let user = req.user;
      let dahsboard = await VendorService.getDashboard(user);
      return res.send({ data: dahsboard, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  refundByTourID: async () => {},
};
