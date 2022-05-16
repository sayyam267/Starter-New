const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  touristID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  tours: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "tours",
    default: [],
  },
});

module.exports = mongoose.model("FavTours", Schema);
