// require("dotenv").config();
// const secret_key = process.env.STRIPE_SECRET;
// const public_key = process.env.STRIPE_PUBLIC;
// // const stripe = require("stripe")(secret_key);

// module.exports={
//     postPayment:async(data)=>{
//         stripe.customers.create({
//             email:
//             source
//         })
//     }
// }

const genToken = require("../helpers/Stripe");
const TransactionsModel = require("../models/Transactions.model");
const UserModel = require("../models/UserModel");
const OrderService = require("./OrderService");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = {
  rechargeAccount: async (req) => {
    try {
      let { id } = req.user;
      // console.log(req.body.payment);
      let {
        CardNumber: n,
        Month: expmonth,
        Year: y,
        CVC: cvc,
        Amount,
      } = req.body.payment;
      let { email, name } = req.body.user;
      let card = {
        number: n,
        exp_month: parseInt(expmonth),
        exp_year: parseInt(y),
        cvc,
        currency: "pkr",
      };
      let token = await genToken(card);
      let customer = await stripe.customers.create({
        email,
        source: token.id,
        name,
      });

      let centtoPkr = Amount * 100;

      let charges = await stripe.charges.create({
        amount: centtoPkr,
        description: "TourBook Credits",
        currency: "pkr",
        customer: customer.id,
      });
      let user = await UserModel.findById(req.user.id);
      // console.log(user);
      await new TransactionsModel({
        CardNumber: n,
        userID: user._id,
        TransID: charges.id,
        // TransDate: new Date.now(),
        RechargedAmount: req.body.payment.Amount,
        Previous_Balance: user.balance,
        New_Balance: Number(user.balance) + Number(req.body.payment.Amount),
      }).save();
      await UserModel.updateOne(
        { _id: req.user.id },
        { balance: Number(user.balance) + Number(req.body.payment.Amount) }
      );
      // await user.update({ balance: balance + Amount });
      return charges;
    } catch (e) {
      throw e;
    }
  },
  refundPurchase: async (req) => {
    try {
      let { userID, TransID } = req.body;
      let transcantion = await TransactionsModel.findOne({
        TransID: TransID,
      });
      if (transcantion) {
        let refund = await stripe.refunds.create({
          charge: TransID,
        });
        // await TransactionsModel.updateOne({_id:TransID},{$set:{refunded = true,Previous_Balance : transcantion.New_Balance}})
        transcantion.refunded = true;
        transcantion.Previous_Balance = Number(transcantion.New_Balance);
        transcantion.New_Balance =
          Number(transcantion.New_Balance) -
          Number(transcantion.RechargedAmount);
        await transcantion.save();
        // let user = await UserModel.findById(req?.user?.id);
        let user = await UserModel.findById(userID);
        user.balance = transcantion.New_Balance;
        await user.save();
        return refund;
      } else {
        let e = new Error();
        e.message = `No Transactions found agains TransactionID ${TransID}`;
        e.statusCode = 404;
        throw e;
      }
    } catch (e) {
      throw e;
      // res.status(500).send(e?.message);
    }
  },
  getTransactionByID: async (id) => {
    try {
      let transcantion = await TransactionsModel.findById(id);
      if (transcantion) {
        return transcantion;
      } else {
        let e = new Error();
        e.message = "Not Found";
        e.statusCode = 404;
        throw e;
      }
    } catch (e) {
      throw e;
    }
  },
  // confirmPurchase: async (req) => {
  //   try {
  //     let user = await UserModel.findById(req.user.id);
  //     if (user) {
  //       OrderService.createOrder();
  //     }
  //   } catch (e) {
  //     return e;
  //   }
  // },
};
