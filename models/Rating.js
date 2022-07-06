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
    vendorID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    message: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ratings", Schema);
