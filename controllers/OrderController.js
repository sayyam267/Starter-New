const OrderService = require("../services/OrderService");
let e = new Error();

// module.exports = {
//   getOrders: async (req, res) => {
//     try {
//       let query = {};
//       if (req.query?.id) {
//         query._id = req.query?.id;
//       }
//       if (req.query?.touristID) {
//         query._id = req.query?.touristID;
//       }
//       if (req.query?.tourID) {
//         query._id = req.query?.tourID;
//       }
//       if (Object.keys(query).length > 0) {
//         const order = await Order.find(query)
//           .populate("users tours")
//           .select([
//             "email",
//             "city",
//             "source",
//             "destination",
//             "addedOn",
//             "validTill",
//           ]);
//         if (order) {
//           return res.send({ message: "FOUND", data: order });
//         } else {
//           e.message = "NOT_FOUND";
//           e.statusCode = 404;
//           throw e;
//         }
//       } else {
//         e.message = "BAD_REQUEST";
//         throw e;
//         //return res.status(400).send({ message: "BAD REQUEST" });
//       }
//     } catch (e) {
//       return res.status(e?.statusCode || 400).send({ message: e?.message });
//     }
//   },
//   deleteOrder: async (req, res) => {
//     try {
//       const existingOrder = await Order.findById(req.body.id);
//       if (existingOrder) {
//         let deleted = await Order.findOneAndDelete({ _id: req.body.id });
//         return res.status(200).send({ message: "DELETED", data: deleted });
//       } else {
//         return res.status(404).send({ message: "NOT FOUND", data: null });
//       }
//     } catch (e) {
//       return res.status(400).send({ message: e.message });
//     }
//   },
// };

module.exports = {
  getOrders: async (req, res) => {
    try {
      let orders = await OrderService.getOrders();
      return res.status(200).send(orders);
    } catch (e) {
      return res.status(e.statusCode).send(e.message);
    }
  },
  getOrdersByID: async (req, res) => {
    try {
      let orders = await OrderService.getOrderByID(req.params.id);
      return res.send(orders);
    } catch (e) {
      return res.status(e.statusCode).send(e.message);
    }
  },
  getOrdersByAmount: async (req, res) => {
    try {
      let orders = await OrderService.getOrdersByAmount(req.query?.amount);
      return res.send(orders);
    } catch (e) {
      return res.status(e.statusCode).send(e.message);
    }
  },
  getOrdersByApporval: async (req, res) => {
    try {
      let orders = await OrderService.getOrdersByApporval(req.query?.approved);
      return res.send(orders);
    } catch (e) {
      return res.status(e.statusCode).send(e.message);
    }
  },
  getOrdersByApporvalByTouristID: async (req, res) => {
    try {
      let orders = await OrderService.getOrdersByApporvalByTouristID({
        approved: req.query?.approved,
        touristID: req.query?.touristID,
      });
      return res.send(orders);
    } catch (e) {
      return res.status(e.statusCode).send(e.message);
    }
  },
  getRefundedOrders: async (req, res) => {
    try {
      let orders = await OrderService.getRefundedOrders();
      return res.send(orders);
    } catch (e) {
      return res.status(e.statusCode).send(e.message);
    }
  },
  getRefundedOrdersByTouristID: async (req, res) => {
    try {
      let orders = await OrderService.getRefundedOrdersByTouristID(
        req.query?.touristID
      );
      return res.send(orders);
    } catch (e) {
      return res.status(e.statusCode).send(e.message);
    }
  },
  approveTour: async (req, res) => {
    try {
      let orders = await OrderService.approveTour(req.body);
      return res.send(orders);
    } catch (e) {
      return res.status(e.statusCode).send(e.message);
    }
  },
  createOrder: async (req, res) => {
    try {
      let orders = await OrderService.createOrder(req.body);
      return res.send(orders);
    } catch (e) {
      return res.status(e.statusCode).send(e.message);
    }
  },
  refundTour: async (req, res) => {
    try {
      let orders = await OrderService.refundTour(req.body);
      return res.send(orders);
    } catch (e) {
      return res.status(e.statusCode).send(e.message);
    }
  },
};