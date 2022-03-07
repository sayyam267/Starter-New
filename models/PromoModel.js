const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  code: { type: String, required: true, unique: true },
  vendorID: { type: mongoose.Schema.Types.ObjectId, ref: "Vendors" },
  dateAdded: { type: Date, requried: true },
  validTill: { type: Date, required: true },
  // expired: { type: Boolean, default: false },
  onTours: { type: Array(mongoose.Schema.Types.ObjectId), ref: "tours" },
  amount: { type: Number, required: true },
  isPercent: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model("PromoCodes", Schema);
