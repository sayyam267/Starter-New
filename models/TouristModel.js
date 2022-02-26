const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "/images/profile-pictures/default.png" },
  userType: { type: String, default: "tourist" },
  address: { type: String },
  city: { type: String, required: true },
  country: { type: String, required: true },
});
module.exports = mongoose.model("Tourists", Schema);
