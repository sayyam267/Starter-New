const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    touristID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    rating: { type: Number, required: true, default: 2.5 },
    tourID: { type: mongoose.Schema.Types.ObjectId, ref: "Tours" },
    // to: { type: String },
    message: { type: String },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Ratings", Schema);
