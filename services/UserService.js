const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const EmailVerification = require("./EmailVerification");
const uuid = require("uuid").v4;

require("dotenv").config();
const bcrypt = require("bcryptjs");
const req = require("express/lib/request");
module.exports = {
  getUsers: async (query) => {
    let queryParam = {};
    if (query?.email) {
      queryParam.email = query?.email;
    }
    if (query?.fname) {
      queryParam.fname = query?.fname;
    }
    if (query?.lname) {
      queryParam.lname = query?.lname;
    }
    if (query?.phone) {
      queryParam.phoneNumber = query?.phone;
    }
    if (query?.role) {
      queryParam.userType = query?.role;
    }
    if (query?.rating) {
      queryParam.rating = query?.rating;
    }
    if (query?.active) {
      queryParam.isActive = query?.active;
    }
    if (query?.verified) {
      queryParam.isVerified = query?.verified;
    }
    if (Object.keys(queryParam).length > 0) {
      let users = await UserModel.find(queryParam).select("-password");
      if (Object.keys(users).length > 0) {
        return users;
      } else {
        let e = new Error();
        e.message = `Users NOT FOUND`;
        e.statusCode = 404;
        throw e;
      }
    } else {
      let e = new Error();
      e.message = "Please Add Query Params";
      e.statusCode = 400;
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
    // console.log(data);
    let existing = await UserModel.findOne({ email: data.email });
    if (existing) {
      let e = new Error();
      e.message = `User with email ${data.email} Already Exist`;
      e.statusCode = 400;
      throw e;
    } else {
      let user = {};
      const uniqueCode = uuid();
      // console.log("EMAIL: " + process.env.MAIL);
      // console.log("PASS: " + process.env.PASS);
      if (data.role === "vendor" || data.role === "tourguide") {
        var salt = await bcrypt.genSalt(Number(process.env.SALT));
        var hashed = await bcrypt.hash(data.password, salt);
        user = await UserModel({
          ...data,
          password: hashed,
          isVerified: false,
          isActive: false,
          userType: data.role,
          isRating: true,
          code: uniqueCode,
        });
        await user.save();
        // return user;
      }
      if (data.role === "tourist") {
        var salt = await bcrypt.genSalt(Number(process.env.SALT));
        var hashed = await bcrypt.hash(data.password, salt);
        user = await UserModel({
          ...data,
          password: hashed,
          isVerified: false,
          isActive: true,
          userType: data.role,
          isRating: false,
          code: uniqueCode,
        });
        await user.save();
        // return tourist;
      }
      await EmailVerification({
        name: data.fname,
        email: data.email,
        confirmationCode: uniqueCode,
      });
      return user;
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
        isVerified: existingUser.isVerified,
      };
      const token = jwt.sign(user, process.env.PRIVATE_KEY);
      return {
        token: token,
        role: existingUser.userType,
        name: existingUser.fname + " " + existingUser.lname,
        email: existingUser.email,
        isVerified: existingUser.isVerified,
      };
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  verifyUser: async (code) => {
    let user = await UserModel.findOne({ code: code }).update(
      { code: code },
      { $set: { isVerified: true } }
    );
    if (!user) {
      throw new Error("NOT FOUND");
    }
  },
};
