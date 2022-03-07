const TourModel = require("../models/TourPack");
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
        const existignTours = await TourModel.find(query).select(["-duration"]);
        if (existignTours.length > 0) {
          res.status(200).send({ message: "FOUND", data: existignTours });
        } else {
          res.status(404).send("NOT FOUND");
        }
      } else {
        throw Error("Please Enter Query Params");
      }
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
  createTours: async (req, res) => {
    try {
      const newTour = await TourModel({
        ...req.body,
        vendorID: req.user._id,
        tourpics: [...req.files],
      });
      await newTour.save();
    } catch (e) {
      req.status(400).send(e.message);
    }
  },
  deleteTours: async (req, res) => {
    try {
      const existignTours = await TourModel.findById(req.body.tourId);
      if (existignTours?.vendorID === req.body.vendorID) {
        let deletedTour = await TourModel.findByIdAndDelete(req.body.tourID);
        return res
          .status(200)
          .send({ message: "TOUR DELETED", data: deletedTour });
      } else {
        return res
          .status(400)
          .send({ message: "YOU ARE NOT ALLOWED TO DO THAT" });
      }
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  },
};
