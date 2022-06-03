const mongoose = require("mongoose");

const UserTransactionsSchema = new mongoose.Schema(
  {
    CardNumber: { type: Number, required: true },
    // New_Balance: {
    //   type: Number,
    //   required: true,
    // },
    // Previous_Balance: {
    //   type: Number,
    //   required: true,
    // },
    RechargedAmount: {
      type: Number,
      required: true,
    },
    TransDate: {
      type: Date,
      default: Date.now,
    },
    // RefundRequest: { type: Boolean, default: false },
    refunded: { type: Boolean, default: false },
    TransID: { type: String },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserTransactions", UserTransactionsSchema);
