const TransactionService = require("../services/TransactionService");

module.exports = {
  purchaseCredits: async (req, res) => {
    try {
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
      let refund = await TransactionService.rechargeAccount(req);
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
};
