const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const authAdmin = require("../middlewares/adminAuth");
// const adminAuth = require("../middlewares/adminAuth");
const handleAuth = require("../middlewares/auth");
// const auth = require("../middlewares/auth");
router.get("/get", OrderController.getOrders);
router.get("/get/:id", OrderController.getOrderByID);
router.get(
  "/refund/get",
  handleAuth,
  authAdmin,
  OrderController.getRefundedOrders
);
router.post("/refund/request", handleAuth, OrderController.requestRefund);
router.post("/create/", handleAuth, OrderController.createOrder);
router.post("/accept", OrderController.approveTour);
router.post("/refund/accept", OrderController.refundTour);
// router.get("/getmyorders", auth, OrderController.getmyOrders);
// router.post("/delete", handleAuth, OrderController.deleteOrder);

module.exports = router;
