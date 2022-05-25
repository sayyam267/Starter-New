const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    isCompleted: { type: Boolean, default: false },
    // city: { type: Array(String), required: true },
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cities",
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cities",
      required: true,
    },
    //remove
    addedOn: { type: Date, required: true, default: Date.now },
    //
    // duration: { type: String, required: true },
    // touristID: { type: mongoose.Schema.Types.ObjectId, ref: "Tourists" },
    vendorID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    seats: { type: Number, required: true },
    validTill: { type: Date, required: true },
    hasGuide: { type: Boolean, required: true },
    hasFood: { type: Boolean, required: true },
    hasTransport: { type: Boolean, required: true },
    hasHotel: { type: Boolean, required: true },
    //backend validation
    meetLocation: {
      long: { type: String, default: 0 },
      lat: { type: String, default: 0 },
    },
    //
    //default empty str
    // tourGuide: { type: mongoose.Schema.Types.ObjectId, ref: "TourGuides" },
    tourpics: { type: Array, default: [] },
    description: { type: String, default: null, required: true },
    //stops locations
    location: {
      long: { type: String, default: 0 },
      lat: { type: String, default: 0 },
    },
    //
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tours", Schema);
