const mongoose = require("mongoose");
const chatRoomSchema = new mongoose.Schema(
  {
    people: { type: Array, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ChatRooms", chatRoomSchema);
