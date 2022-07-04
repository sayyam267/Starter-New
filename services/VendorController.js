const OrderService = require("./OrderService");
const VendorService = require("./VendorService");
const Joi = require("joi");
module.exports = {
  getVendorByID: async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string()
          .required()
          .messages({ "any.required": "Please provide id in params" }),
      });
      await schema.validateAsync(req.params);
      let vendor = await VendorService.getVendorByID(req.params.id);
      return res.send({ data: vendor, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
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
  rejectReservationRequest: async (req, res) => {
    try {
      let user = req.user;
      let requests = await VendorService.rejectReservationRequest(
        req.body.id,
        user
      );
      return res.send({ data: requests, message: "Rejected" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  acceptReservationRequest: async (req, res) => {
    try {
      let user = req.user;
    } catch (e) {}
  },
};
