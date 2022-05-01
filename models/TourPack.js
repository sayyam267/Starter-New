const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // city: { type: Array(String), required: true },
  source: { type: mongoose.SchemaType.ObjectId, ref: "cities", required: true },
  destination: {
    type: mongoose.SchemaType.ObjectId,
    ref: "cities",
    required: true,
  },
  addedOn: { type: Date, required: true },
  // duration: { type: String, required: true },
  // touristID: { type: mongoose.Schema.Types.ObjectId, ref: "Tourists" },
  vendorID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  seats: { type: Number, required: true },
  validTill: { type: Date, required: true },
  hasguide: { type: Boolean, required: true },
  hasFood: { type: Boolean, required: true },
  hasTransport: { type: Boolean, required: true },
  hasHotel: { type: Boolean, required: true },
  meetLocation: {
    long: { type: String, default: 0 },
    lat: { type: String, default: 0 },
  },
  // tourGuide: { type: mongoose.Schema.Types.ObjectId, ref: "TourGuides" },
  tourpics: { type: Array, default: [] },
  location: {
    long: { type: String, default: 0 },
    lat: { type: String, default: 0 },
  },
});

module.exports = mongoose.model("tours", Schema);
