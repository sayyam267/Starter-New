const VendorModel = require("../models/VendorModel");
const bcrypt = require("bcryptjs");
module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let existinguser = await VendorModel.findOne({ email: email });
      if (existinguser) {
        const valid = await bcrypt.compare(password, existinguser.password);
        if (valid) {
          const user = {
            email: existinguser.email,
            id: existinguser._id,
            role: existinguser.userType,
            fname: existinguser.fname,
          };
          return res.status(200).send(user);
        } else {
          throw Error("PASSWORD MISMATCH");
        }
      } else {
        return res.status(404).send("NOT FOUND");
      }
    } catch (e) {
      return res.status(400).send(e.message);
    }
  },
  signup: async (req, res) => {
    try {
      const existinguser = await VendorModel.findOne({ email: req.body.email });
      if (existinguser) {
        throw Error("ALREADY EXISTS Please Proceed to Login");
      } else {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);
        const newVendor = await VendorModel({
          ...req.body,
          password: encryptedPassword,
        });
        await newVendor.save();
        return res
          .status(200)
          .send(`User with Email: ${newVendor.email} Created Successfully`);
      }
    } catch (e) {
      return res.status(400).send(e.message);
    }
  },
};
