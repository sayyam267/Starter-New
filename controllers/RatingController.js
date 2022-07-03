const RatingService = require("../services/RatingService");
const Orders = require("../models/Orders");
const Joi = require("joi");
// module.exports = {
//   addNewRating: async (req, res) => {
//     try {
//       const completedTour = await Orders.findOne({ tourID: req.body.tourID });
//       if (completedTour) {
//         let newratings = await RatingModel({
//           touristID: req.body.id,
//           message: req.body.message,
//           rating: req.body.rating,
//           tourID: req.body.tourID,
//         });
//         await newratings.save();
//         return res.status(200).send({ message: "Ratings added", data: {} });
//       } else return res.status(404).send({ messag: "NOT FOUND", data: null });
//     } catch (e) {
//       return res.status(400).send({ message: e.message });
//     }
//   },
//   editRating: async (req, res) => {
//     try {
//       const existingRatings = await RatingModel.find({
//         tourID: req.body.tourID,
//         touristID: req.body.touristID,
//       });
//       if (existingRatings) {
//         await RatingModel.findOneAndUpdate(
//           { _id: existingRatings._id },
//           { $set: { rating: req.body.rating, message: req.body.message } }
//         );
//         return res.status(200).send({ message: "UPDATED RATING", data: null });
//       } else {
//         return res.status(404).send({ message: "NOT FOUND", data: null });
//       }
//     } catch (e) {
//       return res.status(400).send({ message: e.message });
//     }
//   },
//   getRating: async (req, res) => {
//     try {
//       let query = {};
//       if (req.query?.touristID) {
//         query.touristID = req.query?.touristID;
//       }
//       if (req.query?.id) {
//         query._id = req.query?.id;
//       }
//       if (Object.keys(query).length > 0) {
//         const existingRatings = await RatingModel.find(query);
//         if (existingRatings) {
//           return res
//             .status(200)
//             .send({ message: "FOUND", data: existingRatings });
//         } else {
//           return res.status(404).send({ message: "NOT FOUND" });
//         }
//       } else {
//         res.status(400).send({ message: "PLEASE ENTER QUERY" });
//       }
//     } catch (e) {
//       return res.status(400).send({ message: e.message });
//     }
//   },
// };

module.exports = {
  addRating: async (req, res) => {
    try {
      let user = req.user;
      const schema = Joi.object({
        tourID: Joi.string()
          .required()
          .error(() => {
            return Error("Please Provide roomID");
          }),
        message: Joi.string()
          .required()
          .error(() => {
            return Error("Please Provide Feedback Message");
          }),
        rating: Joi.number().min(1).max(5).required().messages({
          "any.required": "Please Provide amount",
          "number.min": "Rating must be between 1 and 5",
          "number.max": "Rating must be between 1 and 5",
        }),
      });
      await schema.validateAsync(req.body);
      let newRating = await RatingService.addRatings(req.body, user);
      return res.send({ data: newRating, message: "Created" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: e.data || null, message: e.message });
    }
  },
  getRatingByID: async (req, res) => {
    try {
      let rating = await RatingService.getRatingsByID(req.params.id);
      return res.send({ data: rating, message: "Fetched" });
    } catch (e) {
      res.status(e?.statusCode || 400).send({ data: null, message: e.message });
    }
  },
  getRating: async (req, res) => {
    try {
      let query = req.query;
      // console.log(query);
      let rating = await RatingService.getRatings(query);
      res.send({ data: rating, message: "Fetched" });
    } catch (e) {
      res.status(e?.statusCode || 400).send({ data: null, message: e.message });
    }
  },
  deleteRating: async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string()
          .required()
          .error(() => {
            return Error("Please Provide id");
          }),
      });
      await schema.validateAsync(req.body);
      let rating = await RatingService.deleteRating(req.body);
      return res.send({ data: rating, message: "deleted" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
};
