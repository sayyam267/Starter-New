const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const adminAuth = require("../middlewares/adminAuth");
router.get("get", OrderController.getOrders);
// router.post("/delete", adminAuth, OrderController.deleteOrder);

module.exports = router;
