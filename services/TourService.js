const TourModel = require("../models/TourPack");
const UserModel = require("../models/UserModel");
module.exports = {
  getTours: async () => {
    let tours = await TourModel.find({});
    if (Object.keys(tours).length > 0) {
      return tours;
    } else {
      let e = new Error();
      e.message = "No Tours FOUND";
      e.statusCode = 404;
      throw e;
    }
  },
  getToursByID: async (id) => {
    let tours = await TourModel.findById(id);
    if (tours) {
      return tours;
    } else {
      let e = new Error();
      e.message = `Tour Not Found by id ${id}`;
      e.statusCode = 404;
      throw e;
    }
  },
  getMyTours: async (user) => {
    let tours = await TourModel.find({ _id: user.id });
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
  deleteTours: async (data) => {
    let tour = await TourModel.findById(data.id);
    if (!tour) {
      let e = new Error();
      e.message = `Tour Not Found`;
      e.statusCode = 404;
      throw e;
    } else {
      if (tour.vendorID === data.vendorID) {
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
    let existingTour = this.getToursByID(data.id);
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
        return newTour;
      } else {
        let e = new Error();
        e.message = `You cannot DO THAT!`;
        e.statusCode = 400;
        throw e;
      }
    }
  },
};
