const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    text: { type: String, required: true },
    type: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Notifications", Schema);
