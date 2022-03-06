const RatingModel = require("../models/Rating");
const Orders = require("../models/Orders");
module.exports = {
  addNewRating: async (req, res) => {
    try {
      const completedTour = await Orders.findOne({ tourID: req.body.tourID });
      if (completedTour) {
        let newratings = await RatingModel({
          touristID: req.body.id,
          message: req.body.message,
          rating: req.body.rating,
          tourID: req.body.tourID,
        });
        await newratings.save();
        return res.status(200).send({ message: "Ratings added", data: {} });
      } else return res.status(404).send({ messag: "NOT FOUND", data: null });
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  },
  editRating: async (req, res) => {
    try {
      const existingRatings = await RatingModel.find({
        tourID: req.body.tourID,
        touristID: req.body.touristID,
      });
      if (existingRatings) {
        await RatingModel.findOneAndUpdate(
          { _id: existingRatings._id },
          { $set: { rating: req.body.rating, message: req.body.message } }
        );
        return res.status(200).send({ message: "UPDATED RATING", data: null });
      } else {
        return res.status(404).send({ message: "NOT FOUND", data: null });
      }
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  },
  getRating: async (req, res) => {
    try {
      let query = {};
      if (req.query?.touristID) {
        query.touristID = req.query?.touristID;
      }
      if (req.query?.id) {
        query._id = req.query?.id;
      }
      if (Object.keys(query).length > 0) {
        const existingRatings = await RatingModel.find(query);
        if (existingRatings) {
          return res
            .status(200)
            .send({ message: "FOUND", data: existingRatings });
        } else {
          return res.status(404).send({ message: "NOT FOUND" });
        }
      } else {
        res.status(400).send({ message: "PLEASE ENTER QUERY" });
      }
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  },
};
