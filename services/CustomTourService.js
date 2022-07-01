const pusher = require("../helpers/pusher");
const CustomTour = require("../models/CustomTour");
const UserModel = require("../models/UserModel");
const Notification = require("../models/Notifications")

const CustomTourService = {
  requestCustomTour: async (data, user) => {
    let newrequest = await CustomTour.create({ ...data, by: user.id });
    let username = await UserModel.findById(user.id).select(["fname", "lname"]);
    let fullname = username.fname + " " + username.lname;
    let all_vendors = await UserModel.find({ userType: "vendor" }).select(
      "_id"
    );
    if(newrequest){
    all_vendors.forEach((vendor) => {
      let notification = await Notification.create({
        userID:vendor._id,
        text:`There is a new CustomTour Request by ${fullname} for you.`,
        type:"info",
        contentID:newrequest._id
      })
      pusher.trigger(`${vendor._id}`, "notifications", notification);
    });
    return newrequest;
  }
  else{
    let e= new Error("Cannot Create CustomTour in DB");
    e.statusCode=400;
    throw e
  }
  },
  getCustomTourRequests: async (user) => {
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
      let requests2 = requests.filter((req) => {
        return !req.hiddenFrom.includes(user.id);
      });
      return requests2;
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
      .populate({
        path: "fulfilledBy",
        model: "users",
        select: ["fname", "email", "lname"],
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
    console.log(data);
    if (customTourReq) {
      let vendor = await UserModel.findById(user.id).select(["fname", "lname"]);
      let offers = customTourReq.offers;
      let offer = {};
      offer.date = Date.now();
      offer.amount = Number(data.amount);
      offer.vendorID = user.id;
      offer.description = data.description;
      if (!offers.includes(offer)) {
        offers.push(offer);
      }
      customTourReq.offers = offers;
      await customTourReq.save();
      let notification = await Notification.create({
        text: `${vendor.fname} ${vendor.lname} gave you an offer of RS${offer.amount} on your Custom Tour Request of ${customTourReq.description}`,
        userID:customTourReq.by,
        contentID:customTourReq._id,
        type:"info"
      })
      pusher.trigger(`${customTourReq.by}`, "notifications", notification);
      return true;
    } else {
      let e = new Error("Not Found");
      e.statusCode = 404;
      throw e;
    }
  },
  acceptOffer: async (data, user) => {
    let customTourReq = await CustomTour.findById(data.requestID);
    // console.log(data);
    if (customTourReq) {
      let offers = customTourReq.offers;
      let offer = offers.filter((offer) => offer.vendorID == data.vendorID);
      // console.log("offer", offer);
      // customTourReq.offers = offers.splice(offers.indexOf(offer), 1);
      customTourReq.offers = [];
      customTourReq.fulfilledBy = offer[0].vendorID;
      customTourReq.agreedAmount = offer[0].amount;
      let user = await UserModel.findById(customTourReq.by).select([
        "fname",
        "lname",
      ]);
      let fullname = user.fname + " " + user.lname;
      let notification = await Notification.create({
        userID:offer[0].vendorID,
        text:`${fullname} just Accepted your Custom Tour Offer of RS ${offer[0].amount} on ${customTourReq.requirements.description}`,
        contentID:customTourReq._id,
        type:"info"

      })
      pusher.trigger(`${offer[0].vendorID}`, "notifications", notification);
      await customTourReq.save();
    } else {
      let e = new Error("Not Found");
      e.statusCode = 404;
      throw e;
    }
  },
  rejectOffer: async (data, user) => {
    let customTour = await CustomTour.findbyId(data.id);
    if (customTour) {
      let hidden = customTour.hiddenFrom;
      customTour.hiddenFrom = [...hidden, user.id];
      await customTour.save();
      return true;
    } else {
      let e = new Error("Not Found");
      e.statusCode = 404;
      throw e;
    }
  },
};

module.exports = CustomTourService;
