const mongoose = require("mongoose");
const chatRoomSchema = new mongoose.Schema(
  {
    people: {
      type: Array(mongoose.Types.ObjectId),
      required: true,
      default: [],
      ref: "users",
    },
    lastMessage: {
      type: mongoose.Types.ObjectId,
      ref: "messages",
      default: null,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ChatRooms", chatRoomSchema);
