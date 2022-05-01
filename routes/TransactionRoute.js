const router = require("express").Router();
const TransactionController = require("../controllers/TranscantionController");

router.post("/buy", TransactionController.purchaseCredits);
router.post("/refund", TransactionController.refundPurchase);
router.get("/:id", TransactionController.getTransactionByID);

module.exports = router;
