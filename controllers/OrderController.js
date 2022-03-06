const Order = require("../models/Orders");

module.exports = {
  getOrders: async (req, res) => {
    try {
      let query = {};
      if (req.query?.id) {
        query._id = req.query?.id;
      }
      if (req.query?.touristID) {
        query._id = req.query?.touristID;
      }
      if (req.query?.tourID) {
        query._id = req.query?.tourID;
      }
      if (Object.keys(query).length > 0) {
        const order = await Order.find(query)
          .populate("users tours")
          .select([
            "email",
            "city",
            "source",
            "destination",
            "addedOn",
            "validTill",
          ]);
        if (order) {
          return res.status(200).send({ message: "FOUND", data: order });
        } else {
          return res.status(404).send({ message: "NOT FOUND", data: order });
        }
      } else {
        return res.status(400).send({ message: "BAD REQUEST" });
      }
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const existingOrder = await Order.findById(req.body.id);
      if (existingOrder) {
        let deleted = await Order.findOneAndDelete({ _id: req.body.id });
        return res.status(200).send({ message: "DELETED", data: deleted });
      } else {
        return res.status(404).send({ message: "NOT FOUND", data: null });
      }
    } catch (e) {
      return res.status(400).send({ message: e.message });
    }
  },
};
