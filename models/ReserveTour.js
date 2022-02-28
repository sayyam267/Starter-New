const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  touristID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  promo: { type: mongoose.Schema.Types.ObjectId, ref: "PromoCodes" },
  amount: { type: Number, required: true },
  tourID: { type: mongoose.Schema.Types.ObjectId, ref: "Tours" },
  seats: { type: Number, required: true },
});

module.exports = mongoose.model("ReservedTours", Schema);
