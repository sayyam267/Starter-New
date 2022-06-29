const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    roomID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ChatRooms",
      required: true,
    },
    message: { type: String, required: true },
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      required: true,
    },
    receiver: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", messageSchema);
