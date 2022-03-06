const ReserveController = require("../controllers/ReserveController");
const authTourist = require("../middlewares/userAuth");
const authVendor = require("../middlewares/vendorAuth");

const router = require("express").Router();

router.post("/add", authTourist, ReserveController.reserveTour);
router.post("/accept", authVendor, ReserveController.acceptTourReq);
router.post("/delete", authVendor, ReserveController.deleteRequest);

module.exports = router;
