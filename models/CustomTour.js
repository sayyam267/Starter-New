const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    by: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
      default: {},
    },
    requirements: {
      maxBudget: { type: Number, required: true },
      seats: { type: Number, required: true },
      description: { type: String, required: true },
      city: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "cities",
      },
      isHotel: { type: Boolean, default: false },
      isGuide: { type: Boolean, default: false },
    },
    fulfilledBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
      default: {},
    },
    amount: { type: Number, default: 0 },
  },
  { timestamp: true }
);

module.exports = mongoose.model("customtour", Schema);
