const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const authAdmin = require("../middlewares/adminAuth");
const authVendor = require("../middlewares/vendorAuth");
// const adminAuth = require("../middlewares/adminAuth");
const handleAuth = require("../middlewares/auth");
// const auth = require("../middlewares/auth");
router.get("/get", OrderController.getOrders);
router.get("/get/:id", OrderController.getOrderByID);
router.get(
  "/refund/get",
  handleAuth,
  // authAdmin,
  OrderController.getRefundedOrders
);
router.put("/request/refund", handleAuth, OrderController.requestRefund);
router.post("/create/", handleAuth, OrderController.createOrder);
router.put("/accept", handleAuth, authVendor, OrderController.approveTour);
router.put("/reject", handleAuth, authVendor, OrderController.rejectTour);
router.put(
  "/refund/accept",
  handleAuth,
  authVendor,
  OrderController.refundTour
);
router.put(
  "/refund/reject",
  handleAuth,
  authVendor,
  OrderController.rejectRefundRequest
);
// router.get("/getmyorders", auth, OrderController.getmyOrders);
// router.post("/delete", handleAuth, OrderController.deleteOrder);

module.exports = router;
