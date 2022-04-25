const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const adminAuth = require("../middlewares/adminAuth");
const auth = require("../middlewares/auth");
router.get("get", OrderController.getOrders);
router.get("getmyorders", auth(), OrderController.getmyOrders);
// router.post("/delete", adminAuth, OrderController.deleteOrder);

module.exports = router;
