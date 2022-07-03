const TransactionService = require("../services/TransactionService");
const Joi = require("joi");
module.exports = {
  purchaseCredits: async (req, res) => {
    try {
      const schema = Joi.object({
        payment: Joi.object.keys({
          CardNumber: Joi.string().required(),
          Month: Joi.number().min(1).max(12).required(),
          Year: Joi.number().required(),
          CVC: Joi.number().required(),
          Amount: Joi.number().required(),
        }),
        user: Joi.object().keys({
          email: Joi.string().email().required(),
          name: Joi.string().min(5).required(),
        }),
      });
      await schema.validateAsync(req.body);
      let purchase = await TransactionService.rechargeAccount(req);
      return res.status(200).send({
        data: purchase,
        message: "Successfull Purchase of Tourbook Credits",
      });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  refundPurchase: async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      await schema.validateAsync(req.body);
      let refund = await TransactionService.refundPurchase(req.body);
      return res
        .status(200)
        .send({ data: refund, message: "Refund Successfully" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  getTransactionByID: async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      await schema.validateAsync(req.params);
      let transcantion = await TransactionService.getTransactionByID(
        req.params.id
      );
      return res.status(200).send({ data: transcantion, message: "Fetched" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e.message });
    }
  },
  getMyTranscations: async (req, res) => {
    try {
      let user = req.user;
      let transcantions = await TransactionService.getMyTransactions(user);
      return res.send({ data: transcantions, message: "Fetched Transactions" });
    } catch (e) {
      return res
        .status(e?.statusCode || 400)
        .send({ data: null, message: e?.message });
    }
  },
};
