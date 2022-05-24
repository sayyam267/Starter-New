const router = require("express").Router();
const TransactionController = require("../controllers/TranscantionController");
const handleAuth = require("../middlewares/auth");

router.post("/buy", handleAuth, TransactionController.purchaseCredits);
router.put("/refund", TransactionController.refundPurchase);
router.get("/:id", TransactionController.getTransactionByID);

module.exports = router;
