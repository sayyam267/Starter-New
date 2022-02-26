const TourGuideModel = require("../models/TourGuideModel");
const bcrypt = require("bcryptjs");
module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let existinguser = await TourGuideModel.findOne({ email: email });
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
      const existinguser = await TourGuideModel.findOne({
        email: req.body.email,
      });
      if (existinguser) {
        throw Error("ALREADY EXISTS Please Proceed to Login");
      } else {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);
        const newTourGuide = await TourGuideModel({
          ...req.body,
          password: encryptedPassword,
        });
        await newTourGuide.save();
        return res
          .status(200)
          .send(`User with Email: ${newTourGuide.email} Created Successfully`);
      }
    } catch (e) {
      return res.status(400).send(e.message);
    }
  },
  getGuide: async (req, res) => {
    try {
      let query = {};
      if (req.query?.email) {
        query.email = req.query?.email;
      }
      if (req.query?.id) {
        query._id = req.query?.id;
      }
      if (req.query?.fname) {
        query.fname = req.query?.fname;
      }
      if (req.query?.phone) {
        query.phoneNumber = req.query?.phone;
      }
      if (Object.keys(query).length > 0) {
        const user = await TourGuideModel.find({ query });
        const filtered = user.map((a) => a._id);
        return res.status(200).send(filtered);
      } else {
        res.status(200).send("Nothing To Show Without Query");
      }
    } catch (e) {
      res.status(400).send(e);
    }
  },
};
