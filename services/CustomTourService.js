const CustomTour = require("../models/CustomTour");

const CustomTourService = {
  requestCustomTour: async (data, user) => {
    let newrequest = await CustomTour({ ...data, by: user.id });
    await newrequest.save();
  },
  getCustomTourRequests: async () => {
    let e = new Error();
    let requests = await CustomTour.find({ fulfilledBy: null })
      .populate({
        path: "by",
        model: "users",
        select: ["fname", "phoneNumber", "email"],
      })
      .populate(["requirements.source", "requirements.destination"]);

    // .populate({
    //   path: "requirements.source",
    //   model: "cities",
    //   select: "name",
    // })
    // .populate({
    //   path: "requirements.destination",
    //   model: "cities",
    //   select: "name",
    // });
    // .populate(["requirements.source", "requirements.destination", "by"])
    // .select(["by.fname", "by.phoneNumber"]);
    if (Object.keys(requests).length > 0) {
      return requests;
    } else {
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
  },
  getCustomTourRequestsBytouristID: async (id) => {
    let e = new Error();
    let myRequests = await CustomTour.find({ by: id })
      .populate({
        path: "by",
        model: "users",
        select: ["fname", "phoneNumber", "email"],
      })
      .populate(["requirements.source", "requirements.destination"]);
    console.log(myRequests);
    if (Object.keys(myRequests).length > 0) {
      return myRequests;
    } else {
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
  },
  getCustomTourRequestByVendorID: async (data) => {
    let e = new Error();
    let myRequests = await CustomTour.find({ fulfilledBy: data.vendorID })
      .populate({
        path: "by",
        model: "users",
        select: ["fname", "phoneNumber", "email"],
      })
      .populate({
        path: "fulfilledBy",
        model: "users",
        select: ["fname", "phoneNumber", "email"],
      })
      .populate(["requirements.source", "requirements.destination"]);
    if (Object.keys(myRequests).length > 0) {
      return myRequests;
    } else {
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
  },
  getCustomTourRequestByID: async (id) => {
    let e = new Error();
    let requests = await CustomTour.findById(id)
      .populate({
        path: "by",
        model: "users",
        select: ["fname", "phoneNumber", "email"],
      })
      .populate(["requirements.source", "requirements.destination"]);
    if (requests) {
      return requests;
    } else {
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
  },
  acceptCustomTourRequest: async (data, user) => {
    let e = new Error();
    let request = await CustomTour.findOne({ _id: data.id, fulfilledBy: null })
      .populate({
        path: "by",
        model: "users",
        select: ["fname", "phoneNumber", "email"],
      })
      .populate(["requirements.source", "requirements.destination"]);
    if (request) {
      request.fulfilledBy = user.id;
      request.amountTaken = data?.amountTaken;
      await request.save();
      return request;
    } else {
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
  },
  deleteCustomTourRequest: async (data, user) => {
    let e = new Error();
    let request = await CustomTour.findById(data.id).populate([
      "requirements.source",
      "requirements.destination",
    ]);
    if (request) {
      if (String(user.id) == String(request.by._id)) {
        await request.delete();
        return true;
      } else {
        e.message = "You Cannot do that";
        e.statusCode = 400;
        throw e;
      }
    } else {
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
  },
  deleteAllMyRequests: async (user) => {
    let e = new Error();
    let myRequests = await CustomTour.find({ by: user.id });
    if (myRequests) {
      await myRequests.delete();
      return true;
    } else {
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
  },
  giveOffer: async (data, user) => {
    let customTourReq = await CustomTour.findById(data.requestID);
    if (customTourReq) {
      let offers = customTourReq.offers;
      let offer = {};
      offer.date = Date.now();
      offer.amount = data.amount;
      offer.vendorID = user.id;
      offer.description = data.description;
      if (offers.indexOf(offer) != -1) {
        offers.push(offer);
      }
      customTourReq.offers = offers;
      await customTourReq.save();
    } else {
      let e = new Error("Not Found");
      e.statusCode = 404;
      throw e;
    }
  },
  acceptOffer: async (data, user) => {
    let customTourReq = await CustomTour.findById(data.requestID);
    if (offer) {
      let offers = customTourReq.offers;
      let offer = offers.filter((offer) => offer.vendorID == data.vendorID);
      customTourReq.offers = offers.splice(offers.indexOf(offer), 1);
      customTourReq.fulfilledBy = offer.vendorID;
      customTourReq.agreedAmount = offer.amount;
      await customTourReq.save();
    } else {
      let e = new Error("Not Found");
      e.statusCode = 404;
      throw e;
    }
  },
};

module.exports = CustomTourService;
