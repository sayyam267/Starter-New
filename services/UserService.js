const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const EmailVerification = require("./EmailVerification");
const uuid = require("uuid").v4;

require("dotenv").config();
const bcrypt = require("bcryptjs");
// const UserTypeController = require("../controllers/UserTypeController");
// const UserTypeService = require("./UserTypeService");
// const UserType = require("../models/UserType");
// const req = require("express/lib/request");

module.exports = {
  getProfileInfo: async (user) => {
    let details = await UserModel.findById(user.id)
      .select([
        "fname",
        "lname",
        "city",
        "balance",
        "profilePicture",
        "gender",
        "phoneNumber",
        "email",
        "isRating",
        "rating",
      ])
      .populate("city");
    if (details) {
      return details;
    } else {
      let e = new Error();
      e.message = "NOT FOUND";
      e.statusCode = 404;
      throw e;
    }
  },
  getUsers: async (query) => {
    let e = new Error();

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
        e.message = `Users NOT FOUND`;
        e.statusCode = 404;
        throw e;
      }
    } else {
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
  // getUserByBalance: async (balance) => {
  //   let users = UserModel.find({ balance: { $gte: balance } }).select([
  //     "-password",
  //     "phoneNumber",
  //     "-role",
  //   ]);
  //   if (Object.keys(users).length > 0) {
  //     return users;
  //   } else {
  //     let e = new Error();
  //     e.message = `NOT FOUND`;
  //     e.statusCode = 404;
  //     throw e;
  //   }
  // },
  getUserByEmail: async (email) => {
    let user = await UserModel.findOne({
      email: email,
      isActive: true,
      isDeleted: false,
    }).select("-password");
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
    let users = await UserModel.find({
      phoneNumber: phone,
      isActive: true,
      isDeleted: false,
    }).select(["-password", "-phoneNumber", "-role"]);
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
    let tourists = await UserModel.find({
      userType: "6274bff67e124664e16ead9f",
      isActive: true,
      isDeleted: false,
    }).select(["-password", "-phoneNumber", "-role"]);
    if (Object.keys(tourists).length > 0) {
      return tourists;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getPendingVendors: async () => {
    let vendors = await UserModel.find({
      $or: [{ userType: "vendor" }, { userType: "tourguide" }],
      isActive: false,
      isDeleted: false,
    })
      .select([
        "fname",
        "lname",
        "isActive",
        "isVerified",
        "isDeleted",
        "city",
        "userType",
      ])
      .populate("city");
    // .select(["-password", "-phoneNumber", "-role", "-cnic"]);
    // if (Object.keys(vendors).length > 0) {
    if (vendors) {
      console.log(vendors);
      return vendors;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getVendors: async () => {
    let vendors = await UserModel.find({
      $or: [{ userType: "vendor" }, { userType: "tourguide" }],
      isActive: true,
      isDeleted: false,
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
  getVendorsByRating: async (rating) => {
    let vendors = await UserModel.find({
      $or: [{ userType: "vendor" }, { userType: "tourguide" }],
      isActive: true,
      isDeleted: false,
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
    try {
      let vendor = await UserModel.findById(data.vendorID);
      if (vendor) {
        if (vendor.isActive === true && vendor.isDeleted === false) {
          let updatedvendor = await UserModel.updateOne(
            { _id: data.vendorID },
            { $set: { isActive: true } }
          );
          return vendor;
        } else {
          let e = new Error();
          e.message = "Not Found";
          e.statusCode = 404;
          throw e;
        }
      } else {
        let e = new Error();
        e.message = `NOT FOUND`;
        e.statusCode = 404;
        throw e;
      }
    } catch (e) {
      throw e;
    }
  },
  blockUser: async (data) => {
    // let user = await UserModel.findOneAndUpdate(
    //   { _id: data, isActive: true, isDeleted: false, isVerified: true },
    //   { $set: { isActive: false } }
    // );
    let user = await UserModel.findOneAndUpdate({
      _id: data,
      isActive: true,
      isDeleted: false,
      isVerified: true,
    });
    if (user) {
      // console.log(user);
      return true;
    } else if (!user?.isActive) {
      let e = new Error();
      e.message = "This User is already Blocked";
      e.statusCode = 400;
      throw e;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  createUserService: async (data) => {
    let user = {};
    const uniqueCode = uuid();
    try {
      await EmailVerification({
        name: data.fname,
        email: data.email,
        confirmationCode: uniqueCode,
      });
    } catch (e) {
      throw e;
    }
    // console.log("EMAIL: " + process.env.MAIL);
    // console.log("PASS: " + process.env.PASS);
    // let userType = await UserTypeService.findById(data.usertype);
    // let userType = await UserType.findOne({ userType: data.role });
    // console.log(userType);
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
        isActive: false,
        userType: "tourist",
        isRating: false,
        code: uniqueCode,
      });
      await user.save();
      // return tourist;
    }

    return user;
  },
  createAdmin: async (data) => {
    const uniqueCode = uuid();
    var salt = await bcrypt.genSalt(Number(process.env.SALT));
    var hashed = await bcrypt.hash(data.password, salt);
    let user = await UserModel({
      ...data,
      password: hashed,
      isVerified: true,
      isActive: true,
      userType: "admin",
      isRating: false,
      code: uniqueCode,
    });
    await user.save();
    // return user;
    return user;
  },
  createUser: async (data) => {
    let e = new Error();
    // console.log(data);
    let existing = await UserModel.findOne({
      email: data.email,
      // isDeleted: true,
    });
    if (existing) {
      if (!existing?.isDeleted) {
        if (existing?.isActive && existing?.isVerified) {
          // let e = new Error();
          e.message = `User with email ${data.email} Already Exist`;
          e.statusCode = 400;
          throw e;
        } else if (!existing?.isActive && existing?.isVerified) {
          // let e = new Error();
          e.message =
            "The User is Banned from using TourBook Services. Contact Support";
          e.statusCode = 400;
          throw e;
        } else {
          e.message = "Please Verify Your Account from Email";
          e.statusCode = 400;
          throw e;
        }
      } else {
        try {
          let user = await module.exports.createUserService(data);
          return user;
        } catch (e) {
          throw e;
        }
      }
    } else {
      try {
        let user = await module.exports.createUserService(data);
        return user;
      } catch (e) {
        throw e;
      }
    }
  },

  loginUser: async (data) => {
    let existingUser = await UserModel.findOne({
      email: data.email,
      // isActive: true,
      // isVerified: true,
      isDeleted: false,
    });
    if (existingUser) {
      // if (existingUser?.isActive && existingUser?.isVerified) {
      //   let verify = await bcrypt.compare(data.password, existingUser.password);
      //   if (!verify) {
      //     let e = new Error();
      //     e.statusCode = 400;
      //     e.message = "Either the email or Password is Wrong!";
      //     throw e;
      //   } else {
      //     const user = {
      //       id: existingUser._id,
      //       email: existingUser.email,
      //       name: existingUser.fname + " " + existingUser.lname,
      //       role: existingUser.userType,
      //       // isActive: existingUser.isActive,
      //     };
      //     const token = jwt.sign(user, process.env.PRIVATE_KEY);
      //     return {
      //       token: token,
      //       role: existingUser.userType,
      //       name: existingUser.fname + " " + existingUser.lname,
      //       email: existingUser.email,
      //       // isVerified: existingUser.isVerified,
      //       balance: existingUser.balance,
      //     };
      //   }
      // }
      // if (!existingUser?.isActive || !existingUser?.isVerified) {
      if (existingUser?.isVerified) {
        if (!existingUser?.isActive) {
          let e = new Error();
          e.message = "You are Blocked from TourBook. Please Contact Support";
          e.statusCode = 400;
          throw e;
        }
        if (existingUser?.isActive) {
          let verify = await bcrypt.compare(
            data.password,
            existingUser.password
          );
          if (!verify) {
            let e = new Error();
            e.statusCode = 400;
            e.message = "Either the email or Password is Wrong!";
            throw e;
          } else {
            const user = {
              id: existingUser._id,
              email: existingUser.email,
              name: existingUser.fname + " " + existingUser.lname,
              role: existingUser.userType,
              // isActive: existingUser.isActive,
            };
            const token = jwt.sign(user, process.env.PRIVATE_KEY);
            return {
              token: token,
              role: existingUser.userType,
              name: existingUser.fname + " " + existingUser.lname,
              email: existingUser.email,
              // isVerified: existingUser.isVerified,
              balance: existingUser.balance,
            };
          }
        }
      }
      if (!existingUser?.isActive && !existingUser?.isVerified) {
        let e = new Error();
        e.message = "Please Verify Your Account through Email first";
        e.statusCode = 400;
        throw e;
      }
      if (existingUser?.isActive && !existingUser?.isVerified) {
        let e = new Error();
        e.message = "Internal Logic Error";
        e.statusCode = 500;
        throw e;
      }
    } else {
      let e = new Error();
      e.message = `User not found against this email`;
      e.statusCode = 404;
      throw e;
    }
  },
  verifyUser: async (code) => {
    let user = await UserModel.findOne({ code: code }).update(
      { code: code },
      { $set: { isVerified: true, isActive: true } }
    );
    if (!user) {
      throw new Error("NOT FOUND");
    }
  },
  deleteUser: async (id) => {
    let user = await UserModel.findById().update();
  },
};
