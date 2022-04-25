const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  touristID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  rating: { type: Number, required: true, default: 2.5 },
  tourID: { type: mongoose.Schema.Types.ObjectId, ref: "Tours" },
  message: { type: String },
});

module.exports = mongoose.model("Ratings", Schema);
