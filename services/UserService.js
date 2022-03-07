const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const req = require("express/lib/request");
module.exports = {
  getUsers: async () => {
    let users = await (await UserModel.find({})).select("-password");
    if (Object.keys(users).length > 0) {
      return users;
    } else {
      let e = new Error();
      e.message = `Users NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getUserByID: async (id) => {
    let user = await UserModel.findById(id).select("-password");
    if (user) {
      return user;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getUserByBalance: async (balance) => {
    let users = UserModel.find({ balance: { $gte: balance } }).select([
      "-password",
      "phoneNumber",
      "-role",
    ]);
    if (Object.keys(users).length > 0) {
      return users;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getUserByEmail: async (email) => {
    let user = await UserModel.findOne({ email: email }).select("-password");
    if (user) {
      return user;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getUserByPhone: async (phone) => {
    let users = await UserModel.find({ phoneNumber: phone }).select([
      "-password",
      "-phoneNumber",
      "-role",
    ]);
    if (Object.keys(users).length > 0) {
      return users;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getTourists: async () => {
    let tourists = await UserModel.find({ role: "tourist" }).select([
      "-password",
      "-phoneNumber",
      "-role",
    ]);
    if (Object.keys(tourists).length > 0) {
      return tourists;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getVendors: async () => {
    let vendors = await UserModel.find({ role: "vendor" }).select([
      "-password",
      "-phoneNumber",
      "-role",
    ]);
    if (Object.keys(vendors).length > 0) {
      return vendors;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getVendorsByRating: async (rating) => {
    let vendors = await UserModel.find({
      role: "vendor",
      rating: { $lte: rating },
    }).select(["-password", "-phoneNumber", "-role"]);
    if (Object.keys(vendors).length > 0) {
      return vendors;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  setVendorVerificationStaus: async (data) => {
    let vendor = await UserModel.findById(data.vendorID);
    if (vendor) {
      let updatedvendor = await UserModel.updateOne(
        { _id: data.vendorID },
        { $set: { isActive: true } }
      );
      return vendor;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  blockUser: async (data) => {
    let user = await UserModel.findOneAndUpdate(
      { _id: data.id },
      { $set: { isActive: false } }
    );
    if (user) {
      return user;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  createUser: async (data) => {
    let existing = await UserModel.findOne({ email: data.email });
    if (existing) {
      let e = new Error();
      e.message = `User with email ${data.email} Already Exist`;
      e.statusCode = 400;
      throw e;
    } else {
      if (data.role === "vendor" || data.role === "tourguide") {
        var salt = await bcrypt.genSalt(Number(process.env.SALT));
        var hashed = await bcrypt.hash(data.password, salt);
        let vendor = await UserModel({
          ...data,
          password: hashed,
          isVerified: false,
          isActive: false,
          userType: data.role,
          isRating: true,
        });
        await vendor.save();
        return vendor;
      }
      if (data.role === "tourist") {
        var salt = await bcrypt.genSalt(Number(process.env.SALT));
        var hashed = await bcrypt.hash(data.password, salt);
        let tourist = await UserModel({
          ...data,
          password: hashed,
          isVerified: false,
          isActive: true,
          userType: data.role,
          isRating: false,
        });
        await tourist.save();
        return tourist;
      }
    }
  },
  loginUser: async (data) => {
    let existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) {
      const user = {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.fname + " " + existingUser.lname,
        role: existingUser.userType,
      };
      const token = jwt.sign(user, process.env.PRIVATE_KEY);
      return {
        token: token,
        role: existingUser.userType,
        name: existingUser.fname + " " + existingUser.lname,
        email: existingUser.email,
      };
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
};
