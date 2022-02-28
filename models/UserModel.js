const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  profilePicture: {
    type: String,
    default: "/images/profile-pictures/default.jpg",
  },
  address: { type: String },
  userType: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isRating: { type: Boolean },
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model("users", Schema);
