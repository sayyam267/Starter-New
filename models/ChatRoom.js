const mongoose = require("mongoose");
const chatRoomSchema = new mongoose.Schema(
  {
    people: { type: Array, required: true },
    lastMessage: {
      type: mongoose.Types.ObjectId,
      ref: "messages",
      default: null,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ChatRooms", chatRoomSchema);
