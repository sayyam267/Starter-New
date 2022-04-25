// const ReserveModel = require("../models/ReserveTour");
// const Order = require("../models/Orders");
// const TourModel = require("../models/TourPack");
// module.exports = {
//   reserveTour: async (req, res) => {
//     try {
//       const existingReq = await ReserveModel.find({
//         tourID: req.body.tourID,
//         touristID: req.body.touristID,
//       });
//       if (existingReq) {
//         return res.status(400).send({ message: "ALREADY IN QUEUE" });
//       } else {
//         let newReq = await ReserveModel({
//           touristID: req.body.touristID,
//           tourID: req.body.tourID,
//           amount: req.body.amount,
//           seats: req.body.seats,
//         });
//         await newReq.save();
//         return res.status(200).send({ mesasge: "CREATED", data: newReq });
//       }
//     } catch (e) {
//       return res.status(400).send({ mesasge: e.mesasge });
//     }
//   },
//   acceptTourReq: async (req, res) => {
//     try {
//       const existingReq = await ReserveModel.findById(req.body.id);
//       const TourPack = await TourModel.findById(existingReq.tourID);
//       if (TourPack.seats > 0 && TourPack.seats >= existingReq.seats) {
//         var newOrder = await Order(...existingReq);
//         await TourModel.updateOne(
//           { _id: existingReq.tourID },
//           { $set: { seats: TourPack.seats - existingReq.seats } }
//         );
//         await ReserveModel.findOneAndDelete({ _id: existingReq._id });
//       }
//       return res.status(200).send({ message: "Approved", data: newOrder });
//     } catch (e) {
//       return res.status(400).send({ message: e.message });
//     }
//   },
//   deleteRequest: async (req, res) => {
//     try {
//       const existingReq = await ReserveModel.findByIdAndDelete(req.body.id);
//       return res.status(200).send({ message: "REMOVED", data: existingReq });
//     } catch (e) {
//       return res.status(400).send({ message: e.message });
//     }
//   },
// };
