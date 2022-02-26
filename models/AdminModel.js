const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  fname: { type: String },
  lname: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profilePic: { type: String, default: "images/profile-pictures/default.png" },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  phoneNumber: { type: String, required: true },
  userType: { type: String, default: "admin" },
});

module.exports = mongoose.model("Admins", Schema);
