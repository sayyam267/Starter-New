const CustomTourService = require("../services/CustomTourService");
const CustomTour = require("../services/CustomTourService");
const Joi = require("joi");
module.exports = {
  requestCustomTour: async (req, res) => {
    try {
      const schema = Joi.object({
        requirements: Joi.object().keys({
          maxBudget: Joi.number()
            .min(100)
            .max(99999)
            .required("Please Provide maxBudget"),
          seats: Joi.number().min(1).required("Please provide # of seats!"),
          description: Joi.string().required("Please provide Description!"),
          source: Joi.string().required("Please provide Source City!"),
          destination: Joi.string().required(
            "Please provide Destination City!"
          ),
          isHotel: Joi.boolean().required("Please provide Hotel Requirement!"),
          isGuide: Joi.boolean().required("Please provide Guide Requirement!"),
          places: Joi.array().required(
            "Please provide places you want to visit!"
          ),
          startDate: Joi.date().required("Please provide Date you want to go!"),
          endDate: Joi.date().required(
            "Please provide Date that will tell the duration of tour!"
          ),
        }),
      });
      await schema.validateAsync(req.body);
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
      let requests = await CustomTourService.getCustomTourRequests(req?.user);
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
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      await schema.validateAsync(req.body);
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
      const schema = Joi.object({
        id: Joi.string().min(3).required(),
      });
      await schema.validateAsync(req.params);
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
      const schema = Joi.object({
        id: Joi.string().min(3).required(),
      });
      await schema.validateAsync(req.body);
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
  rejectOffer: async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string().min(3).required(),
      });
      await schema.validateAsync(req.body);
      let reject = await CustomTourService.rejectOffer(req.body, req?.user);
      res.send({
        data: reject,
        message: "Rejected, It wont appear in your feed!",
      });
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
  giveOffer: async (req, res) => {
    try {
      const schema = Joi.object({
        amount: Joi.number().min(100).required(),
        description: Joi.string().required(),
        requestID: Joi.string().required(),
      });
      await schema.validateAsync(req.body);
      let user = req.user;
      let isOffer = CustomTourService.giveOffer(req.body, user);
      return res.send({ data: isOffer, message: "Offer Presented to User" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  acceptOffer: async (req, res) => {
    try {
      const schema = Joi.object({
        requestID: Joi.string().required(),
        vendorID: Joi.string().required(),
      });
      await schema.validateAsync(req.body);
      let user = req.user;
      let isOffer = CustomTourService.acceptOffer(req.body, user);
      return res.send({ data: isOffer, message: "Offer Accepted" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
};
