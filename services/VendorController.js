const VendorService = require("./VendorService");

module.exports = {
  getRefundTourRequests: async (req, res) => {
    try {
      let user = req.user;
      let requests = await VendorService.getRefundTourRequests(user);
      res.send({ data: requests, message: "Fetched" });
    } catch (e) {
      res.status(e?.statusCode || 400).send({ data: null, message: e.message });
    }
  },
  acceptRefundRequest: async () => {},
  rejectRefundTourRequest: async () => {},
  refundByTourID: async () => {},
};
