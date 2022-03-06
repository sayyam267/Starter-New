const PromoModel = require("../models/PromoModel");

module.exports = {
  createPromo: async (req, res) => {
    try {
      const existingPromo = await PromoModel.findOne({ code: req.body.code });
      if (!existingPromo) {
        let newPromo = await PromoModel({
          code: req.body.code,
          vendorID: req.body.vendor,
          dateAdded: req.body.date,
          validTill: req.body.validTill,
          amount: req.body.amount,
          isPercent: req.body.isPercent,
        });
        await newPromo.save();
        return res.status(200).send({ message: "CREATED", data: newPromo });
      } else {
        return res
          .status(200)
          .send({ message: "ALREADY EXIST", data: existingPromo });
      }
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  },
  editPromo: async (req, res) => {
    try {
      const existingPromo = await PromoModel.findById(req.body.id);
      if (existingPromo) {
        let newPromo = await PromoModel.findOneAndUpdate(
          { _id: req.body.id },
          {
            $set: {
              code: req.body.code,
              amount: req.body.amount,
              isPercent: req.body.isPercent,
              dateAdded: req.body.dateAdded,
              validTill: req.body.validTill,
            },
          }
        );
        return res.send({ message: "UPDATED", data: newPromo });
      } else {
        return res.status(404).send({ message: "NOT FOUND", data: null });
      }
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  },
  getPromo: async (req, res) => {
    try {
      let query = {};
      if (req.query?.id) {
        query._id = req.query?.id;
      }
      if (req.query?.vendorID) {
        query._id = req.query?.vendorID;
      }
      if (req.query?.amount) {
        query._id = req.query?.amount;
      }
      if (Object.keys(query).length > 0) {
        const promo = await PromoModel.find(query);
        if (promo) {
          return res.status(200).send({ message: "FOUND", data: promo });
        } else {
          return res.status(404).send({ message: "NOT FOUND", data: null });
        }
      } else {
        return res.status(400).send({ message: "ADD ?q Params" });
      }
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  },
};
