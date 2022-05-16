const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  userType: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("usertype", Schema);
