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
  rechargeAccount: async (data) => {
    try {
      let { id } = req.user;
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
      await new TransactionsModel({
        CardNumber: CardNumber,
        userID: id,
        TransID: token.id,
        TransDate: new Date.now(),
        RechargedAmount: Amount,
        Previous_Balance: user.balance,
        New_Balance: user.balance + Amount,
      });
      user.update({ balance: balance + Amount });
      return res.json(charges);
    } catch (e) {
      return e;
    }
  },
  refundPurchase: async (req) => {
    try {
      let { id } = req.body;
      let transcantion = await TransactionsModel.findOne({
        TransID: req.body.TransID,
      });
      if (transcantion) {
        let refund = await stripe.refunds.create({
          charge: id,
        });
        transcantion.refunded = true;
        transcantion.Previous_Balance = transcantion.New_Balance;
        transcantion.New_Balance =
          transcantion.New_Balance - transcantion.rechargeAccount;
        await transcantion.save();
        let user = await UserModel.findById(req?.user?.id);
        user.balance = transcantion.New_Balance;
        await user.save();

        res.send(refund);
      }
    } catch (e) {
      res.status(500).send(e?.message);
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
