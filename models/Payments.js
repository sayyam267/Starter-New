const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  invoiceID: { type: String, required: true },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  description: { type: String, required: true },
  // TourID: { type: mongoose.Schema.Types.ObjectId, ref: "tours" },
  isrefund: { type: Boolean },
});

module.exports = mongoose.model("payments", Schema);
