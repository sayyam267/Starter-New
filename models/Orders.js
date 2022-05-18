const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    tourID: { type: mongoose.Schema.Types.ObjectId, ref: "tours" },
    // tourID: { type: String, required: true },
    seats: { type: Number, requierd: true },
    promo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PromoCodes",
      default: {},
    },
    amount: { type: Number, required: true },
    touristID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isApproved: { type: Boolean, default: false },
    isRefunded: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    requestRefund: { type: Boolean, default: false },
    //delete
    // refundAmount: { type: Number, default: 0 },
    //
  },
  { timestamp: true }
);

module.exports = mongoose.model("Orders", Schema);
