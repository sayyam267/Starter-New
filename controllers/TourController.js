const TourModel = require("../models/TourPack");
const TourService = require("../services/TourService");
module.exports = {
  getTour: async (req, res) => {
    try {
      let query = {};
      if (req.query?.id) {
        query._id = req.query?.id;
      }
      if (req.query?.name) {
        query.name = req.query?.name;
      }
      if (req.query?.city) {
        query.city = req.query?.city;
      }
      if (req.query?.source) {
        query.source = req.query?.source;
      }
      if (req.query?.destination) {
        query.destination = req.query?.destination;
      }
      if (req.query?.addedOn) {
        query.addedOn = req.query?.addedOn;
      }
      if (req.query?.seats) {
        query.seats = req.query?.seats;
      }
      if (req.query?.vendorId) {
        query.vendorId = req.query?.vendorId;
      }
      if (req.query?.price) {
        query.price = req.query?.price;
      }

      if (Object.keys(query).length > 0) {
        const existingTours = await TourModel.find(query).select(["-duration"]);
        if (existingTours.length > 0) {
          return res
            .status(200)
            .send({ message: "FOUND", data: existingTours });
        } else {
          return res.status(404).send("NOT FOUND");
        }
      } else {
        throw Error("Please Enter Query Params");
      }
    } catch (e) {
      return res.status(400).send(e.message);
    }
  },
  getmyTours: async (req, res) => {
    try {
      const tours = await TourService.getMyTours(req.user);
      return res.status(200).send({ data: tours, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  createTour: async (req, res) => {
    try {
      console.log(req.body, "BODY");
      let tours = await TourService.createTour(req);
      return res.status(200).send({ data: tours, message: "Created" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  // createTours: async (req, res) => {
  //   try {
  //     const files = req.files.multiImages;
  //     const imageNames = [];
  //     const addedOn = Date.now();
  //     if (files.length > 0) {
  //       files.map((file) => {
  //         //SAVING IN DB
  //         // console.log("public/images/" + file.filename);
  //         imageNames.push("images/tourpics/" + file.filename);
  //       });
  //     } else imageNames.push("images/tourpics/" + file.filename);
  //     // console.log(req.files.filename);
  //     // console.log(req.file);
  //     console.log(req.body);
  //     req.body.validTill = new Date(req.body.validTill);
  //     //   console.log(imageNames);
  //     const newTour = await TourModel({
  //       ...req.body,
  //       vendorID: req.user.id,
  //       tourpics: imageNames,
  //       addedOn: addedOn,
  //     });
  //     await newTour.save();
  //   } catch (e) {
  //     res.status(e?.statusCode || 400).send(e.message);
  //   }
  // },
  deleteTours: async (req, res) => {
    try {
      let { id } = req.body;
      const tourToDelete = await TourService.deleteTours(id);
      return res.send({ data: tourToDelete, message: "Deleted" });
      //   const existignTours = await TourModel.findById(id);
      //   if (
      //     existignTours?.vendorID === req.body.vendorID &&
      //     existignTours.isCompleted == false
      //   ) {
      //     let deletedTour = await TourModel.findByIdAndDelete(id);
      //     return res
      //       .status(200)
      //       .send({ message: "TOUR DELETED", data: deletedTour });
      //   } else {
      //     return res
      //       .status(400)
      //       .send({ message: "YOU ARE NOT ALLOWED TO DO THAT" });
      //   }
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  },
  getAll: async (req, res) => {
    try {
      let tours = await TourService.getTours();
      return res.status(200).send({ data: tours, message: "Fetched" });
    } catch (e) {
      res.status(e?.statusCode || 400).send({ data: null, message: e.message });
    }
  },
  getTourByID: async (req, res) => {
    try {
      let { id } = req.params;
      let user = req?.user;
      let tour = await TourService.getToursByID(id, user);
      return res.status(200).send({ data: tour, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  FilterTourSearch: async (req, res) => {
    try {
      let query = {};
      if (req?.query?.source) {
        query.source = req?.query?.source;
      }
      if (req?.query?.destination) {
        query.destination = req?.query?.destination;
      }
      if (req?.query?.price) {
        query.price = req?.query?.price;
      }
      if (req?.query?.seats) {
        query.seats = req?.query?.seats;
      }
      if (req?.query?.source) {
        query.source = req?.query?.source;
      }
      if (req?.query?.source) {
        query.source = req?.query?.source;
      }
      let tours = await TourService.TripFilterSearch(query);
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  home: async (req, res) => {
    try {
      let user = req.user;
      let tours = await TourService.home(req.body, user);
      return res.send({ data: tours, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
};
