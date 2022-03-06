const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // city: { type: Array(String), required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  addedOn: { type: Date, required: true },
  // duration: { type: String, required: true },
  // touristID: { type: mongoose.Schema.Types.ObjectId, ref: "Tourists" },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendors" },
  seats: { type: Number, required: true },
  ValidTill: { type: Date, required: true },
  hasguide: { type: Boolean, required: true },
  tourGuide: { type: mongoose.Schema.Types.ObjectId, ref: "TourGuides" },
  tourpics: { type: Array(String) },
  location: {
    long: { type: String },
    lat: { type: String },
  },
});

module.exports = mongoose.model("Tours", Schema);
