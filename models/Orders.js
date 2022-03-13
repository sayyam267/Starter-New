const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  tourID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  seats: { type: Number, requierd: true },
  promo: { type: mongoose.Schema.Types.ObjectId, ref: "PromoCodes" },
  amount: { type: Number, required: true },
  touristID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  isApproved: { type: Boolean, default: false },
  isRefunded: { type: Boolean, default: false },
});

module.exports = mongoose.model("Orders", Schema);