const OrderController = require("../controllers/OrderController");
const handleAuth = require("../middlewares/auth");
const authVendor = require("../middlewares/vendorAuth");
const VendorController = require("../services/VendorController");

const router = require("express").Router();

router.get(
  "/get/refunds",
  handleAuth,
  authVendor,
  VendorController.getRefundTourRequests
);
router.post(
  "/accept/refund/:id",
  handleAuth,
  authVendor,
  VendorController.acceptRefundRequest
);
router.post(
  "/accept/order/:id",
  handleAuth,
  authVendor,
  OrderController.approveTour
);
module.exports = router;
