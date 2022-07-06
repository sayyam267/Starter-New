const TourModel = require("../models/TourPack");
const UserModel = require("../models/UserModel");
const OrderModel = require("../models/Orders");
const pusher = require("../helpers/pusher");
const Notification = require("../models/Notifications");
module.exports = {
  markAsDone: async (tourID, user) => {
    let tour = await TourModel.findById(tourID);
    let updated = await tour.update({ isCompleted: true });
    let orders = await OrderModel.find({
      tourID: tourID,
      isApproved: true,
      isRefunded: false,
    }).select("touristID");
    orders.forEach(async (order) => {
      let notification = await Notification.create({
        text: `How was your Tour ${tour.name}? Please provide feedback.`,
        contentID: tour._id,
        userID: order.touristID,
        type: "tour",
      });
      pusher.trigger(`${order.touristID}`, "notifications", notification);
    });
  },
  getTours: async () => {
    let tours = await TourModel.find({}).populate(["source", "destination"]);
    let latestTours = await TourModel.find({ seats: { $gt: 0 } })
      .select(["tourpics", "vendorID", "seats", "name", "price"])
      .sort("-createdAt")
      .limit(5);
    // console.log(tours);
    if (Object.keys(tours).length > 0) {
      return { tours, carousal: latestTours };
    } else {
      let e = new Error();
      e.message = "No Tours FOUND";
      e.statusCode = 404;
      throw e;
    }
  },
  home: async (body, user) => {
    try {
      let user1 = await UserModel.findById(user.id).select([
        "source",
        "destination",
      ]);
      // console.log(user1.city);
      let cityTours = await TourModel.find({ source: user1.city }).populate([
        "source",
        "destination",
      ]);
      let popularTours = await TourModel.find({
        rating: { $gt: 3 },
        source: user1.city,
      }).populate(["source", "destination"]);
      // let trendingTours = await OrderModel.find({})
      let tours = {
        cityTours: cityTours,
        popularTours: popularTours,
      };
      return tours;
    } catch (e) {
      throw e;
    }
  },
  getToursByID: async (id, user) => {
    let touristApproved = false;

    let tours = await TourModel.findById(id)
      .populate(["source", "destination"])
      .populate({
        path: "vendorID",
        model: "users",
        select: ["fname", "lname", "email", "profilePicture"],
      });
    if (tours) {
      if (user) {
        let order = await OrderModel.find({ touristID: user.id });
        if (order) {
          if (order?.isApproved) {
            touristApproved = true;
          }
        }
      }
      return { tours, touristApproved: touristApproved };
    } else {
      let e = new Error();
      e.message = `Tour Not Found by id ${id}`;
      e.statusCode = 404;
      throw e;
    }
  },
  getMyTours: async (user) => {
    let tours = await TourModel.find({ vendorID: user.id }).populate([
      "source",
      "destination",
    ]);
    if (tours) {
      return tours;
    } else {
      let e = new Error();
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
  },
  getToursByName: async (name) => {
    let tours = await TourModel.find({ name: name });
    if (Object.keys(tours).length > 0) return tours;
    else {
      let e = new Error();
      e.message = `No Tours Found with name ${name}`;
      e.statusCode = 404;
      throw e;
    }
  },
  getToursByStoreRating: async (rating) => {
    let vendors = await UserModel.find({ role: "vendor", rating: rating });
    let tours = await TourModel.find({ vendorID: vendors._id });
    if (Object.keys(tours) > 0) return tours;
    else {
      let e = new Error();
      e.messag = `Tours with ratings ${rating} not Found`;
      e.statusCode = 404;
      throw e;
    }
  },
  getToursByPrice: async (price) => {
    let tours = await TourModel.find({ price: price });
    if (Object.keys(tours).length > 0) {
      return tours;
    } else {
      let e = new Error();
      e.message = `No Tours found with price ${price}`;
      e.statusCode = 404;
      throw e;
    }
  },
  getToursByCity: async (source) => {
    let tours = await TourModel.find({ source: source });
    if (Object.keys(tours).length > 0) {
      return tours;
    } else {
      let e = new Error();
      e.message = `No Tours found in city : ${city}`;
      e.statusCode = 404;
      throw e;
    }
  },
  getToursInPriceRange: async (data) => {
    let tours = await TourModel.find({
      price: { $gte: data.range1, $lte: data.range2 },
    });
    if (Object.keys(tours).length > 0) {
      return tours;
    } else {
      let e = new Error();
      e.message = `No Tours Found with price range ${
        data.range1 + " <-> " + data.range2
      }`;
      e.statusCode = 404;
      throw e;
    }
  },
  getToursFromSourcetoDestination: async (data) => {
    let tours = await TourModel.find({
      source: data.source,
      destination: data.destination,
    });
    if (Object.keys(tours) > 0) {
      return tours;
    } else {
      let e = new Error();
      e.message = `No Tours Found from ${data.source} to ${data.destination}`;
      e.statusCode = 404;
      throw e;
    }
  },
  // createTours: async (data) => {
  //   let date = new Date();
  //   let newTour = await TourModel({ ...data, addedOn: date });
  //   await newTour.save();
  //   return newTour;
  // },
  createTour: async (req) => {
    try {
      console.log(req.body);
      // console.log(req.files.multiImages);
      const files = req.files.multiImages;
      const imageNames = [];
      const addedOn = Date.now();
      if (files.length > 0) {
        files.map((file) => {
          //SAVING IN DB
          // console.log("public/images/" + file.filename);
          imageNames.push("images/tourpics/" + file.filename);
        });
      } else imageNames.push("images/tourpics/" + file.filename);
      // console.log(req.files.filename);
      // console.log(req.file);
      // console.log(req.body);
      req.body.validTill = new Date(req.body.validTill);
      //   console.log(imageNames);
      const newTour = await TourModel({
        ...req.body,
        vendorID: req.user.id,
        tourpics: imageNames,
        addedOn: addedOn,
      });
      await newTour.save();
      return newTour;
    } catch (e) {
      throw e;
    }
  },
  createTour: async (req) => {
    try {
      // console.log(req.body);
      // console.log(req.files.multiImages);
      // console.log(req.body.places, "PLACES");
      // req.body.places.forEach((item) => console.log(JSON.parse(item)));
      // console.log(req.body);
      // console.log(JSON.parse(req.body.places));
      // console.log(JSON.parse(req.body.meetLocation));
      req.body.meetLocation = JSON.parse(req.body.meetLocation);
      req.body.places = JSON.parse(req.body.places);
      // console.log("places", req.body.places);
      // console.log(req.body.meetLocation);
      // console.log("VALID", new Date(req.body.validTill));
      // req.body.validTill = new Date(req.body.validTill);
      // req.body.startDate = new Date(req.body.startDate);
      // req.body.price=Number(req.body.price)
      // req.body.seats=Number(req.body.seats);
      // req.body.validTill=new Date(req.body.validTill);
      // req.body.meetLocation.forEach((item) =>
      //   console.log(item.name, item.location)
      // );
      // console.log(req.body.meetLocation, "MEET");
      const files = req.files.multiImages;
      const imageNames = [];
      const addedOn = Date.now();
      if (files.length > 0) {
        files.map((file) => {
          //SAVING IN DB
          // console.log("public/images/" + file.filename);
          imageNames.push(
            "http://tourbook-backend.herokuapp.com/images/tourpics/" +
              file.filename
          );
        });
      } else
        imageNames.push(
          "http://tourbook-backend.herokuapp.com/images/tourpics/" +
            file.filename
        );
      // console.log(req.files.filename);
      // console.log(req.file);
      // console.log(req.body);
      req.body.validTill = new Date(req.body.validTill);
      //   console.log(imageNames);
      const newTour = await TourModel({
        ...req.body,
        vendorID: req.user.id,
        tourpics: imageNames,
        places: req.body.places,
        addedOn: addedOn,
      });
      await newTour.save();
      return newTour;
    } catch (e) {
      throw e;
    }
  },
  deleteTours: async (id) => {
    let tour = await TourModel.findById(id);
    if (!tour) {
      let e = new Error();
      e.message = `Tour Not Found`;
      e.statusCode = 404;
      throw e;
    } else {
      if (tour.vendorID === data.vendorID && tour.isCompleted == false) {
        await TourModel.deleteOne(tour);
        return true;
      } else {
        let e = new Error();
        e.message = "You are Not Allowed to Do That";
        e.statusCode = 400;
        throw e;
      }
    }
  },
  editTour: async (data) => {
    let existingTour = module.exports.getToursByID(data.id);
    if (!existingTour) {
      let e = new Error();
      e.message = `Tour Not Found to Edit`;
      e.statusCode = 404;
      throw e;
    } else {
      if (existingTour.vendorID === data.vendorID) {
        let newdetails = data.newdetails;
        let newTour = await TourModel.findOneAndReplace(
          { _id: data.id },
          newdetails
        );
        let notification = await Notification.create({
          text: `Your Tour ${tour.name} Info was edited`,
          contentID: tour._id,
          userID: existingTour.vendorID,
          type: "tour",
        });
        pusher.trigger(
          `${existingTour.vendorID}`,
          "notifications",
          notification
        );
        return newTour;
      } else {
        let e = new Error();
        e.message = `You cannot DO THAT!`;
        e.statusCode = 400;
        throw e;
      }
    }
  },
  TripFilterSearch: async (data) => {
    let tours = await TourModel.find({ data }).populate([
      "source",
      "destination",
    ]);
    if (tours) {
      return tours;
    } else {
      let e = new Error();
      e.message = "Not Found";
      e.statusCode = 404;
      throw e;
    }
  },
};
