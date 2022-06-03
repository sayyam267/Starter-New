const mongoose = require("mongoose");
const lodash = require("lodash");
const Schema = mongoose.Schema(
  {
    fname: { type: String, required: true, trim: true },
    lname: { type: String, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, default: "" },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cities",
      required: false,
    },
    country: { type: String, required: false, default: "Pakistan" },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    profilePicture: {
      type: String,
      default: "",
      // default: "/images/profile-pictures/default.jpg",
    },
    gender: { type: String, required: false, default: "" },
    balance: { type: Number, default: 0, required: false },
    // address: { type: String },
    //table:
    source: { type: String, default: "" },
    userType: { type: String, required: true, default: "" },
    // userType: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "usertype",
    //   required: true,
    // },
    //
    phoneNumber: { type: String, default: "" },
    isRating: { type: Boolean, default: false },
    //virtual mongo attr
    rating: { type: Number, default: 0 },
    //
    cnic: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    //daate and expiry in array
    // code: { type: String, required: true },
    emailVerificationCode: { type: String, default: "" },
    // emailVerificationExpiry:{type:Date,required:false},
    passwordResetCode: { type: String, default: null },
    passwordResetExpiry: { type: Date, default: null },
    // code: {
    //   type: Array,
    //   required: true,
    //   // default: [{ type: "", code: "", expiresOn: "", isExpired: false }],
    // },
    //
  },
  { timestamps: true }
);
// Schema.virtual('balance').get(()=>{
//   return
// })
Schema.virtual("fullName").get(() => {
  return lodash.startCase(this.fname + " " + this.lname);
});
Schema.virtual("fullName").set((value) => {
  const nameA = value.split(" ");
  this.name.fname = nameA[0];
  this.name.lname = nameA[1];
});
module.exports = mongoose.model("users", Schema);
