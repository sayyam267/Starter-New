const AdminController = require("../controllers/AdminController");
const authAdmin = require("../middlewares/adminAuth");
const handleAuth = require("../middlewares/auth");
const router = require("express").Router();

router.post("/block", handleAuth, authAdmin, AdminController.blockUser);
router.post("/create", handleAuth, authAdmin, AdminController.createAdmins);
router.post("/delete", handleAuth, authAdmin, AdminController.deleteUser);
router.get(
  "/pendingVendors",
  handleAuth,
  authAdmin,
  AdminController.getPendingVendorRequests
);
router.post(
  "/accept",
  handleAuth,
  authAdmin,
  AdminController.acceptVendorRequest
);
module.exports = router;
