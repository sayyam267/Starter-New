const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    fname: { type: String, required: true, trim: true },
    lname: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cities",
      required: true,
    },
    country: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    profilePicture: {
      type: String,
      default: "",
      // default: "/images/profile-pictures/default.jpg",
    },
    gender: { type: String, required: true },
    balance: { type: Number, default: 0 },
    address: { type: String },
    //table:
    userType: { type: String, required: true },
    // userType: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "usertype",
    //   required: true,
    // },
    //
    phoneNumber: { type: String, required: true },
    isRating: { type: Boolean, default: false },
    //virtual mongo attr
    rating: { type: Number, default: 0 },
    //
    cnic: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    //daate and expiry in array
    code: { type: String, required: true },
    // code: {
    //   type: Array,
    //   required: true,
    //   // default: [{ type: "", code: "", expiresOn: "", isExpired: false }],
    // },
    //
  },
  { timestamp: true }
);
// Schema.virtual('balance').get(()=>{
//   return
// })

module.exports = mongoose.model("users", Schema);
