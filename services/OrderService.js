const OrderModel = require("../models/Orders");
const UserModel = require("../models/UserModel");
module.exports = {
  getOrders: async () => {
    let existingOrders = await OrderModel.find({});
    if (Object.keys(existingOrders).length > 0) {
      return existingOrders;
    } else {
      let e = new Error();
      e.message = `Orders Not Found`;
      e.statusCode = 404;
      throw e;
    }
  },
  getMyOrders: async (user) => {
    let orders = OrderModel.find({ touristID: user.id });
    if (orders) {
      return orders;
    } else {
      let e = new Error();
      e.message = "No Orders Found";
      e.statusCode = 404;
      throw e;
    }
  },
  getOrderByID: async (id) => {
    let existingOrder = await OrderModel.findById(id);
    if (existingOrder) {
      return existingOrder;
    } else {
      let e = new Error();
      e.message = `Orders Not Found`;
      e.statusCode = 404;
      throw e;
    }
  },
  getOrderByVendorID: async (id) => {
    //Asad HELP
    let existingOrder = await OrderModel.find({});
    if (existingOrder) {
      return existingOrder;
    } else {
      let e = new Error();
      e.message = `Orders Not Found`;
      e.statusCode = 404;
      throw e;
    }
  },
  getOrdersByAmount: async (amount) => {
    let existingOrder = await OrderModel.find({ amount: amount });
    if (Object.keys(existingOrder).length > 0) {
      return existingOrder;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getOrdersByApporval: async (data) => {
    let orders = await OrderModel.find({ isApproved: data.approved });
    if (Object.keys(orders).length > 0) {
      return orders;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getOrdersByApporvalByTouristID: async (data) => {
    let orders = await OrderModel.find({
      isApproved: data.approved,
      touristID: data.touristID,
    });
    if (Object.keys(orders).length > 0) {
      return orders;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getRefundedOrders: async () => {
    let orders = await OrderModel.find({ isRefunded: true });
    if (Object.keys(orders).length > 0) {
      return orders;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getRefundedOrdersByTourID: async (id) => {
    let orders = await OrderModel.find({ tourID: id, isRefunded: true });
    if (Object.keys(orders).length > 0) {
      return orders;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getRefundedOrdersByTouristID: async (id) => {
    let orders = await OrderModel.find({ touristID: id, isRefunded: true });
    if (Object.keys(orders).length > 0) {
      return orders;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  createOrder: async (data, user) => {
    // console.log(user);
    if (!data?.touristID && !user) {
      let e = new Error(
        "touristID not found in body or the user is not logged in"
      );
      e.statusCode = 400;
      throw e;
    }
    // console.log(user.id);
    let existinguser = await UserModel.findById(user.id).select("balance");
    if (existinguser.balance >= data.amount) {
      let existingOrder = await OrderModel.findOne({
        tourID: data.tourID,
        seats: data.seats,
        promo: data.promo,
        amount: data.amount,
        // touristID: data.touristID,
        touristID: user.id,
      });
      if (!existingOrder) {
        let newOrder = await OrderModel({
          tourID: data.tourID,
          seats: data.seats,
          promo: data.promo,
          amount: data.amount,
          // touristID: data.touristID,
          touristID: user.id,
        });
        await newOrder.save();
        return newOrder;
      } else {
        let e = new Error();
        e.message = `Already Exists`;
        e.statusCode = 400;
        throw e;
      }
    } else {
      let e = new Error("Not Enough Credits to Reserve Tour");
      e.statusCode = 400;
      throw e;
    }
  },
  approveTour: async (data) => {
    let existingOrder = await OrderModel.findOneAndUpdate(
      { _id: data.id },
      { $set: { isApproved: true } }
    );
    if (existingOrder) {
      return existingOrder;
    } else {
      let e = new Error();
      e.message = `NOT FOUND`;
      e.statusCode = 404;
      throw e;
    }
  },
  getOrdersByTouristID: async (data) => {
    let orders = await OrderModel.find({ touristID: data });
    if (Object.keys(orders) > 0) {
      return orders;
    } else {
      let e = new Error();
      e.message = `No Tours Found for Tourist ${data}`;
      e.statusCode = 404;
      throw e;
    }
  },
  refundOrder: async (data) => {
    let existingOrder = await OrderModel.findOne({
      _id: data.id,
      isRefunded: false,
      requestRefund: true,
    });
    // console.log(existingOrder);
    if (existingOrder) {
      let userToRefund = await UserModel.findById(existingOrder.touristID);
      // let refundamount =
      //   Number(userToRefund.balance) + Number(existingOrder.amount);
      // console.log(refundamount, "Balance " + userToRefund.balance);
      await UserModel.updateOne(
        { _id: existingOrder.touristID },
        {
          $set: {
            balance:
              Number(userToRefund.balance) + Number(existingOrder.amount),
          },
        }

        // { $set: { balance: userToRefund.balance + order.refundAmount } }
      );
      let refunded = await OrderModel.updateOne(
        { _id: data.id },
        {
          $set: {
            isRefunded: true,
            refundAmount: Number(existingOrder.amount),
          },
        }
      );
      return refunded.acknowledged ? true : false;
    } else {
      let e = new Error();
      e.message = `Either the Order was already Refunded or Not Found`;
      e.statusCode = 404;
      throw e;
    }
  },
  getOrdersByTourID: async (id) => {
    const orders = await OrderModel.find({ tourID: id });
    if (orders) {
      return orders;
    } else {
      let e = new Error();
      e.message = "not FOund";
      e.statusCode = 404;
      throw e;
    }
  },
  requestRefund: async (body) => {
    let order = await OrderModel.findOneAndUpdate(
      { _id: body.orderID },
      { $set: { requestRefund: true } }
    );
    if (order) return true;
    else {
      let e = new Error("Not Found");
      e.statusCode = 404;
      throw e;
    }
  },
};
