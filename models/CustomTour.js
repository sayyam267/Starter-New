const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    by: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    // to: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   // type: String,
    //   default: null,
    //   // required: true,
    //   ref: "users",
    // },
    requirements: {
      maxBudget: { type: Number, required: true },
      seats: { type: Number, required: true },
      description: { type: String, required: true },
      source: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "cities",
      },
      destination: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "cities",
      },
      isHotel: { type: Boolean, default: false },
      isGuide: { type: Boolean, default: false },
    },
    fulfilledBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      // type: [String],
      // required: true,
      ref: "users",
    },
    amountTaken: { type: Number, default: 0, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("customtour", Schema);
