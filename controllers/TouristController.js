// const TouristModel = require("../models/TouristModel");
// const bcrypt = require("bcryptjs");
// module.exports = {
//   login: async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const existingUser = await TouristModel.findOne({ email: email });
//       if (existingUser) {
//         const valid = await bcrypt.compare(password, existingUser.password);
//         if (valid) {
//           const user = {
//             id: existingUser._id,
//             email: existingUser.email,
//             fname: existingUser.fname,
//             role: existingUser.userType,
//           };
//           return res.status(200).send({ message: "User Found", data: user });
//         } else
//           return res
//             .status(400)
//             .send({ message: "Incorrect Password", data: null });
//       } else {
//         return res
//           .status(404)
//           .send({
//             message:
//               "User not found Please Enter Correct Credientials or Signup!",
//             data: null,
//           });
//       }
//     } catch (e) {
//       return res.status(400).send({ message: e.message, data: null });
//     }
//   },
//   signup: async (req, res) => {
//     try {
//       const existingUser = await TouristModel.findOne({
//         email: req.body.email,
//       });
//       if (existingUser) {
//         throw Error(
//           `User with email ${req.body.email} Already exists. Please Proceed to Login!`
//         );
//       } else {
//         const salt = await bcrypt.genSalt(Number(process.env.SALT));
//         const hash = await bcrypt.hash(req.body.password, salt);
//         const newUser = await TouristModel({
//           ...req.body,
//           password: hash,
//         });
//         await newUser.save();
//         const user = {
//           email: newUser.email,
//           id: newUser._id,
//           fname: newUser.fname,
//           role: newUser.userType,
//         };
//         return res.status(200).send(user);
//       }
//     } catch (e) {
//       return res.status(400).send({ message: e.message, data: null });
//     }
//   },
// };
