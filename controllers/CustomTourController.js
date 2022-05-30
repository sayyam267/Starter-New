const CustomTourService = require("../services/CustomTourService");
const CustomTour = require("../services/CustomTourService");

module.exports = {
  requestCustomTour: async (req, res) => {
    try {
      let user = req?.user;
      let newTourRequest = await CustomTour.requestCustomTour(req.body, user);
      return res.send({ data: newTourRequest, message: "Request Created" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  getCustomTourRequests: async (req, res) => {
    try {
      let requests = await CustomTourService.getCustomTourRequests();
      return res.send({
        data: requests,
        message: "Fetched Custom Tour Requests",
      });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  getCustomTourRequestsByTouristID: async (req, res) => {
    try {
      let requests = await CustomTourService.getCustomTourRequestsBytouristID(
        req.body.id
      );
      return res.send({ data: requests, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  getMYCustomTourRequests: async (req, res) => {
    try {
      let user = req.user;
      let myRequests = await CustomTourService.getCustomTourRequestsBytouristID(
        user.id
      );
      return res.send({ data: myRequests, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  getCustomTourByID: async (req, res) => {
    try {
      let request = await CustomTourService.getCustomTourRequestByID(
        req.params.id
      );
      return res.send({ data: request, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  deleteCustomTourRequest: async (req, res) => {
    try {
      let request = await CustomTourService.deleteCustomTourRequest(
        req.body,
        req.user
      );
      return res.send({ data: request, message: "Deleted" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  acceptCustomTourRequest: async (req, res) => {
    try {
      let user = req?.user;
      let aceptReq = await CustomTourService.acceptCustomTourRequest(
        req.body,
        user
      );
      return res.send({ data: aceptReq, message: "Accepted" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  getCustomTourByVendorID: async (req, res) => {
    try {
      let user = req?.user;
      let myRequests = await CustomTourService.getCustomTourRequestByVendorID({
        vendorID: req?.user?.id,
      });
      return res.send({ data: myRequests, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
};
